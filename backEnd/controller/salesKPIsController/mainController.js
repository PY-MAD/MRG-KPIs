const departmentsModel = require("../../models/departmentsModel");
const quarterModel = require("../../models/quartersModel");
const targetModel = require("../../models/targetModel");
const { calculateTermResults, calculateQuarterPerformance } = require("../../helpers/kpi.utils");

/**
 * GET Dashboard Sales KPIs
 */

module.exports.GETdashboardView = async (req, res) => {
  try {
    const kpis = await targetModel.find().populate(["quarter", "months.terms.term"]).lean();

    const months = [];
    const quarters = [];
  
    kpis.forEach(kpi => {
      const enrichedMonths = calculateTermResults(kpi.months || []);
      const quarterPerformance = calculateQuarterPerformance(enrichedMonths);
  
      quarters.push({
        label: `${kpi.quarter.quarter}`,
        value: quarterPerformance
      });
  
      enrichedMonths.forEach(m => {
        months.push({ label: m.name, value: m.achieved });
      });
    });

    res.render("salesKPIs/dashboard", {
      title: "Sales KPIs Dashboard",
      layout: "../layout.ejs",
      activePage: "Sales KPIs Dashboard",
      user: req.user,
      quarters, 
      months,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports.GETSalesKPIs = async (req, res) => {
  const quarters = await quarterModel.find().lean();
  const targets = await targetModel.find({ quarter: quarters.map((q) => q._id) })
    .populate("quarter")
    .lean();

  // دمج كل ربع مع التارقيت المرتبط فيه فقط
  const marged = quarters.map((q) => {
    const relatedTargets = targets.filter((t) => String(t.quarter._id) === String(q._id));
    return {
      ...q,
      target: relatedTargets,
    };
  });

  res.render("salesKPIs/kpi", {
    title: "Sales KPIs",
    layout: "../layout.ejs",
    activePage: "Sales KPIs",
    user: req.user,
    marged,
  });
};

module.exports.GETtableKPIs = async(req,res)=>{
    const { id } = req.params;
    const successMessage = req.query.success === "1" ? "تم حفظ التحديثات بنجاح ✅" : undefined;

    try {
      const findKpi = await targetModel.findById(id).lean();
      const findDepartment = await departmentsModel.findById(findKpi.department).lean();
      const findQuarter = await quarterModel.findById(findKpi.quarter).lean();
  
      res.render("salesKPIs/components/KPIsTable", {
        title: `Sales KPIs - ${findQuarter.year} - ${findQuarter.quarter}`,
        layout: "../layout.ejs",
        activePage: "Sales KPIs",
        user: req.user,
        kpi: {
          ...findKpi,
          quarterName: `${findQuarter.year} ${findQuarter.quarter}`,
          departmentName: findDepartment.name,
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };



module.exports.GETapiKPIsDashbaord = async(req,res)=>{
  const kpis = await targetModel.find().populate("quarter").lean();

  const months = [];
  const quarters = [];

  kpis.forEach(kpi => {
    const total = kpi.months.reduce((sum, m) => sum + (m.achieved || 0), 0);
    const progress = kpi.salesTarget > 0 ? Math.round((total / kpi.salesTarget) * 100) : 0;

    quarters.push({ label: `${kpi.quarter.quarter}`, value: progress });

    kpi.months.forEach(m => {
      months.push({ label: m.name, value: m.achieved });
    });
  });

  res.json({ quarters, months }); // ✅ JSON وليس HTML
}