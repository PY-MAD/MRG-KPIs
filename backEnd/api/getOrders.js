const puppeteer = require("puppeteer");
const fs = require("fs");

const LOGIN_URL = "https://saudi.tanqeeb.com/ar/employers/login";
const APPLICANTS_URL = "https://saudi.tanqeeb.com/ar/applications/list_applications/20661691/0";
const COOKIES_FILE_PATH = "cookies.json";

// ✅ **بيانات تسجيل الدخول**
const EMAIL = "alhawass@msn.com"; // 🔹 استبدل بالإيميل الخاص بك
const PASSWORD = "Ss42371830"; // 🔹 استبدل بكلمة المرور الخاصة بك

// دالة لحفظ الـ Cookies بعد تسجيل الدخول
async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(COOKIES_FILE_PATH, JSON.stringify(cookies, null, 2));
  console.log("✅ تم حفظ الـ Cookies بنجاح!");
}

// دالة لتحميل الـ Cookies لاستخدامها لاحقًا
async function loadCookies(page) {
  if (fs.existsSync(COOKIES_FILE_PATH)) {
    const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE_PATH));
    await page.setCookie(...cookies);
    console.log("✅ تم تحميل الـ Cookies، يتم تسجيل الدخول تلقائيًا...");
  }
}

async function loginAutomatically(page) {
  await page.goto(LOGIN_URL, { waitUntil: "domcontentloaded" });

  // إدخال البريد الإلكتروني وكلمة المرور
  await page.type("#LoginEmployerEmail", EMAIL, { delay: 50 });
  await page.type("#LoginEmployerPassword", PASSWORD, { delay: 50 });

  // الضغط على Enter لمحاكاة المستخدم
  await page.keyboard.press("Enter");

  // انتظار الانتقال للصفحة التالية
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  console.log("✅ تم تسجيل الدخول بنجاح!");

  // حفظ الـ Cookies لاستخدامها في المستقبل
  await saveCookies(page);
}

// دالة استخراج بيانات المتقدمين
async function scrapeApplicants() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  try {
    // تحميل الـ Cookies إن وجدت
    await loadCookies(page);
    await page.goto(APPLICANTS_URL, { waitUntil: "domcontentloaded" });

    // التحقق من نجاح تسجيل الدخول
    if (page.url().includes("login")) {
      console.log("🔄 يتم تسجيل الدخول تلقائيًا...");
      await loginAutomatically(page);
    }

    console.log("✅ تم تسجيل الدخول! جاري استخراج بيانات المتقدمين...");

    // جلب روابط المتقدمين
    await page.goto(APPLICANTS_URL, { waitUntil: "domcontentloaded" });
    const applicantsLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".card-container a[href^='/ar/profile/']"))
        .map(a => a.href);
    });

    console.log(`✅ تم استخراج ${applicantsLinks.length} متقدم.`);

    let applicantsData = [];

    for (let link of applicantsLinks) {
      console.log(`🔍 استخراج البيانات من: ${link}`);
      await page.goto(link, { waitUntil: "domcontentloaded" });

      let applicant = await page.evaluate((pageLink) => {
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
          name: getText("h3.fs-28"),
          job: getText(".text-secondary.font-weight-semibold.fs-16"),
          age: getTableValue("تاريخ الميلاد:").split("(")[1]?.replace(")", "").trim() || "غير متوفر",
          experience: getTableValue("الخبرة:"),
          national: getTableValue("الجنسية:"),
          city: getTableValue("المدينة:") === "-" ? getTableValue("العنوان :") : getTableValue("المدينة:"),
          phone: getTableValue("رقم الجوال:"),
          email: getTableValue("البريد الإلكتروني:"),
          about: getText(".text-primary-2.fs-14"),
          expectedSalary: getTableValue("الحد الأدنى للراتب:"),
          edu: Array.from(document.querySelectorAll(".fa-graduation-cap ~ .card-body .mb-3 h6"))
            .map(e => e.innerText.trim()),
          experienceArray: Array.from(document.querySelectorAll(".fa-briefcase ~ .card-body .mb-3 h6"))
            .map(e => e.innerText.trim()),
          skills: Array.from(document.querySelectorAll(".fa-fingerprint ~ .card-body button"))
            .map(e => e.innerText.trim()),
          url_cv: document.querySelector("a[href*='/users/download_cv/']")?.href || "غير متوفر",
          url: pageLink // ✅ تم إضافة رابط الصفحة الخاصة بالمتقدم
        };
      }, link);

      applicantsData.push(applicant);
    }

    // حفظ البيانات بصيغة JSON
    const filePath = `applicants_${Date.now()}.json`;
    fs.writeFileSync(filePath, JSON.stringify(applicantsData, null, 2), "utf-8");

    console.log(`📁 تم حفظ البيانات في: ${filePath}`);

  } catch (error) {
    console.error("❌ حدث خطأ:", error);
  } finally {
    await browser.close();
  }
}

// تشغيل الكود
scrapeApplicants();
