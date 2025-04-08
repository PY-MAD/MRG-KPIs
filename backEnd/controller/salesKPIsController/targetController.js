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
      const { quarterId, startDate, endDate, totalTarget } = req.body;
  
      if (!quarterId || !startDate || !endDate || !totalTarget) {
        req.flash("error", "جميع الحقول مطلوبة!");
        return res.redirect("/salesKPIs/target");
      }
  
      const findDepartment = await departmentsModel.findOne({ name: "المبيعات" });
      const findQuarter = await quarterModel.findById(quarterId);
  
      // تقسيم الشهور من الـ quarter
      const months = findQuarter.months.map((name) => ({
        name,
        achieved: 0,
        target: totalTarget/3,
        percentage: 0
      }));
  
      await targetModel.create({
        department: findDepartment._id,
        quarter: quarterId,
        startDate,
        endDate,
        salesTarget: totalTarget,
        months // نمررهم هنا مباشرة
      });
  
      return res.redirect("/salesKPIs/target/");
    } catch (error) {
      req.flash("error", "حدث خطأ: " + error.message);
      console.error(error);
      return res.redirect("/salesKPIs/target/");
    }
  };
  


module.exports.PUTKPIs = async(req,res)=>{
    try {
        const { id } = req.params;
        
        const kpi = await targetModel.findById(id);
        if (!kpi) return res.status(404).send("KPI not found");
    
        kpi.months.forEach((month, index) => {
          const achievedValue = parseFloat(req.body[`achieved_${index}`]);
    
          if (!isNaN(achievedValue) && achievedValue >= 0) {
            month.achieved = achievedValue;
            month.percentage = month.target > 0
              ? Math.round((achievedValue / month.target) * 100)
              : 0;
            month.updatedAt = new Date();
          }
        });
    
        await kpi.save();
        res.redirect(`/salesKPIs/${id}?success=1`); // ترجع لنفس الصفحة
      } catch (error) {
        console.error(error);
        res.status(500).send("حدث خطأ أثناء التحديث");
      }
}  


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