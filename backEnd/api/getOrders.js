const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
// socket
const { io } = require("../app");
const candidateModel = require("../models/candidateModel")

const LOGIN_URL = "https://saudi.tanqeeb.com/ar/employers/login";
const COOKIES_FILE_PATH = "api/data/cookies.json";
const MAX_CONCURRENT_PAGES = 50; // 🔥 أقل عدد للدفعات لتوفير استهلاك الموارد

async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(COOKIES_FILE_PATH, JSON.stringify(cookies, null, 2));
}

async function loadCookies(page) {
  if (fs.existsSync(COOKIES_FILE_PATH)) {
    const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE_PATH));
    await page.setCookie(...cookies);
  }
}

async function loginAutomatically(page, email, password) {
  await page.goto(LOGIN_URL, { waitUntil: 'load' });

  await page.evaluate((email, password) => {
    document.querySelector("#LoginEmployerEmail").value = email;
    document.querySelector("#LoginEmployerPassword").value = password;
  }, email, password);

  await page.click("button.align-items-center.btn.btn-lg.btn-primary.d-flex.fs-20-md.fs-14.justify-content-center.mx-auto.w-100.w-md-75.mt-2");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  await saveCookies(page);
}

// ✅ حساب الزمن المستغرق
function calculateExecutionTime(startTime) {
  const endTime = Date.now();
  console.log(`⏱️ **الزمن المستغرق:** ${(endTime - startTime) / 1000} ثانية`);
}

async function scrapeApplicants(APPLICANTS_URL, email, password) {
  io.on('connection',(socket)=>{
    console.log("🔌 Client connected to socket");
    socket.emit("status", "Connected to server!");
  })

  const startTime = Date.now(); // ✅ تسجيل وقت البداية
  io.emit("serverConnection",true)
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null,
});

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // ✅ منع تحميل الصور والفيديوهات لتسريع Puppeteer
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "font", "media"].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await loadCookies(page);
    await page.goto(APPLICANTS_URL, { waitUntil: "domcontentloaded" });

    if (page.url().includes("login")) {
      await loginAutomatically(page, email, password);
    }

    console.log("✅ تم تسجيل الدخول! جاري استخراج بيانات المتقدمين...");
    io.emit("serverMsg","تم تسجيل الدخول بنجاح");
    await page.waitForSelector(".card-container a[href^='/ar/profile/']", { timeout: 5000 });

    const applicantsLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".card-container a[href^='/ar/profile/']")).map(a => a.href);
    });

    console.log(`✅ تم استخراج ${applicantsLinks.length} متقدم.`);
    io.emit("serverMsg",`✅ تم استخراج ${applicantsLinks.length} متقدم.`);
    io.emit("totalFromServer",applicantsLinks.length);

    let applicantsData = [];

    // ✅ فتح عدد محدد من الصفحات مرة واحدة بدلًا من فتح/إغلاق كل مرة
    const workerPages = await Promise.all(
      Array.from({ length: MAX_CONCURRENT_PAGES }, () => browser.newPage())
    );

    let totalFinished = 0;
    // ✅ تقسيم الروابط إلى دفعات وإرسالها إلى الصفحات المفتوحة
    for (let i = 0; i < applicantsLinks.length; i += MAX_CONCURRENT_PAGES) {
      const batchLinks = applicantsLinks.slice(i, i + MAX_CONCURRENT_PAGES);
      console.log(`🔄 معالجة ${batchLinks.length} متقدم في دفعة واحدة...`);
      io.emit("serverMsg",`🔄 معالجة ${batchLinks.length} متقدم في دفعة واحدة...`);
      totalFinished+= batchLinks.length
      io.emit("doneFromServer",totalFinished);

      const batchResults = await Promise.all(
        batchLinks.map(async (link, index) => {
          const applicantPage = workerPages[index % MAX_CONCURRENT_PAGES]; // إعادة استخدام الصفحة
          await applicantPage.goto(link, { waitUntil: "domcontentloaded" });

          let applicant = await applicantPage.evaluate(() => {
            const getText = (selector) => document.querySelector(selector)?.innerText.trim() || "غير متوفر";

            const getTableValue = (label) => {
              const tables = document.querySelectorAll(".col-md-6 table.table-text tbody");
              for (let table of tables) {
                let rows = table.querySelectorAll("tr");
                for (let row of rows) {
                  let rowLabel = row.querySelector("td:first-child")?.innerText.trim();
                  if (rowLabel === label) {
                    return row.querySelector("td:last-child")?.innerText.trim() || "غير متوفر";
                  }
                }
              }
              return "غير متوفر";
            };

            return {
              الاسم: getText("h3.fs-28"),
              الوظيفة: getText(".text-secondary.font-weight-semibold.fs-16"),
              العمر: getTableValue("تاريخ الميلاد:").split("(")[1]?.replace(")", "").trim() || "غير متوفر",
              الخبرة: getTableValue("الخبرة:"),
              الجنسية: getTableValue("الجنسية:"),
              المدينة: getTableValue("المدينة:") === "-" ? getTableValue("العنوان :") : getTableValue("المدينة:"),
              الجوال: getTableValue("رقم الجوال:"),
              "البريد الإلكتروني": getTableValue("البريد الإلكتروني:"),
              نبذة: getText(".text-primary-2.fs-14"),
              الحد_الأدنى_للراتب: getTableValue("الحد الأدنى للراتب:"),
              رابط_السيرة_الذاتية: document.querySelector("a[href*='/users/download_cv/']")?.href || "غير متوفر",
              رابط_الصفحة: window.location.href
            };
          });

          return applicant;
        })
      );

      applicantsData.push(...batchResults.filter(Boolean));
    }
    const filePath = `applicants_${Date.now()}.json`;
    fs.writeFileSync("api/data/"+filePath, JSON.stringify(applicantsData, null, 2), "utf-8");

    console.log(`📁 تم حفظ البيانات في: ${filePath}`);

    calculateExecutionTime(startTime); // ✅ حساب الزمن بعد انتهاء الكود
    io.emit("serverConnection",false)
    return {
        file:filePath,
        count:applicantsLinks.length
    };
  } catch (error) {
    console.error("❌ حدث خطأ:", error);
  } finally {
    await browser.close();
  }
}
// ✅ تشغيل الكود مع فتح صفحة واحدة فقط لتحسين الأداء
module.exports = scrapeApplicants;
