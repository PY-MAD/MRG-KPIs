const usersModel = require("../../models/usersModel");
const targetModel = require("../../models/targetModel");
const quarterModel = require("../../models/quartersModel");
const departmentsModel = require("../../models/departmentsModel");
const termsModel = require("../../models/termsModel")
/**
 * GET users 
 */
module.exports.GETtargetView = async (req, res) => {
    try {
        const quarter = await quarterModel.find();
        const department = await departmentsModel.findOne({
            name:"المبيعات"
        })
        const targets = await targetModel.find({
            department:department._id
        })

        res.render("salesKPIs/target", {
            title: "Sales KPIs Target",
            layout: "../layout.ejs",
            activePage: "Sales KPIs Target",
            user: req.user,
            quarter,
            targets,
            department
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * 
 * @param {*} req we don't use it
 * @param {*} res return users we have
 */
module.exports.getUsers = async(req,res)=>{
    const findUsers = await usersModel.find();
    res.json(findUsers);
}

/**
 * 
 * @param {*} req GET DETAIL TARGET
 * @param {*} res RETURN THE VIEW PAGE
 * @returns 
 */
module.exports.GETdetailTarget = async(req,res)=>{
    // !not completion
}
/**
 * POST Assign new target without configuration
 * @type {import('express').RequestHandler}
 */
module.exports.POSTNewTarget = async (req, res) => {
  try {
    const { quarterId, startDate, endDate, totalTarget, termsData } = req.body;

    if (!quarterId || !startDate || !endDate || !totalTarget || !termsData) {
      req.flash("error", "جميع الحقول مطلوبة!");
      return res.redirect("/salesKPIs/target");
    }

    const findQuarter = await quarterModel.findById(quarterId).lean();
    const findDepartment = await departmentsModel.findOne({ name: "المبيعات" }).lean();

    if (!findQuarter || !findDepartment) {
      req.flash("error", "تعذر العثور على البيانات المطلوبة");
      return res.redirect("/salesKPIs/target");
    }

    const parsedTerms = JSON.parse(termsData); // التيرمز جاهزة من الفرونت

    // نحسب شهريًا: target / 3
    const monthlyTarget = Math.round(parseFloat(totalTarget) / 3);

    // تجهيز الشهور
    const months = findQuarter.months.map((monthName) => ({
      name: monthName,
      achieved: 0,
      target: monthlyTarget,
      percentage: 0,
      terms: parsedTerms.map(term => ({
        term: term.term,
        weight: term.weight,
        target: term.target,
        achieved: 0,
        result: 0,
      })),
    }));

    // إنشاء الهدف
    await targetModel.create({
      department: findDepartment._id,
      quarter: quarterId,
      startDate,
      endDate,
      salesTarget: parseFloat(totalTarget),
      months,
    });

    req.flash("success", "تم إضافة الهدف بنجاح ✅");
    return res.redirect("/salesKPIs/target");
  } catch (error) {
    console.error("خطأ أثناء إنشاء الهدف:", error.message);
    req.flash("error", "حدث خطأ داخلي");
    return res.redirect("/salesKPIs/target");
  }
};


module.exports.PUTKPIs = async (req, res) => {
  try {
    const { id } = req.params;

    const kpi = await targetModel.findById(id);
    if (!kpi) return res.status(404).send("KPI not found");

    // تحديث المحقق الشهري
    for (let i = 0; i < kpi.months.length; i++) {
      const achievedKey = `achieved_${i}`;
      const achievedValue = parseFloat(req.body[achievedKey]);

      if (!isNaN(achievedValue)) {
        const month = kpi.months[i];
        month.achieved = achievedValue;
        month.percentage = month.target > 0 ? Math.round((achievedValue / month.target) * 100) : 0;
        month.updatedAt = new Date();
      }
    }

    // معالجة termsData
    if (req.body.termsData) {
      const parsedTerms = JSON.parse(req.body.termsData);

      // تجميع التيرمز حسب الـ term ID لتسهيل البحث
      const termsById = {};
      parsedTerms.forEach((t) => {
        if (!termsById[t.term]) termsById[t.term] = [];
        termsById[t.term].push(t);
      });

      // تحديث بيانات التيرمز داخل كل شهر
      for (const month of kpi.months) {
        for (const term of month.terms) {
          const matching = termsById[term.term.toString()];
          if (matching && matching.length) {
            const match = matching.shift(); // ناخذ أول تطابق ونحدث فيه
            term.achieved = match.achieved;
            term.target = match.target;
            term.weight = match.weight;
            term.result = match.target > 0 ? (match.achieved / match.target) * match.weight : 0;
          }
        }
      }
    }

    await kpi.save();
    res.redirect(`/salesKPIs/${id}?success=1`);
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء التحديث");
  }
};


module.exports.GETTerms = async (req, res) => {
  try {
    const terms = await termsModel.find({
      departmentId: { $in: [req.params.depId] }
    }).lean();

    res.json(terms);
  } catch (err) {
    console.error("Error fetching terms:", err);
    res.status(500).json({ error: "Server error" });
  }
};