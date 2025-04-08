const quarterModel = require("../../models/quartersModel");

/**
 * @type {import("express").RequestHandler}
 */
module.exports.POSTquarter = async (req, res) => {
    try {
        const { year, quarter } = req.body;
        console.log(year,quarter);

        // تحقق إن البيانات موجودة
        if (!year || !quarter) {
            return res.status(400).json({ status: 400, message: "Missing year or quarter" });
        }

        // تحقق إذا كان موجود مسبقاً
        const exists = await quarterModel.findOne({ year, quarter });
        if (exists) {
            return res.status(400).json({ status: 400, message: "Quarter already exists" });
        }

        // أنشئ الأشهر تلقائيًا حسب الربع
        const getMonthsByQuarter = (q) => {
            const map = {
                q1: ['January', 'February', 'March'],
                q2: ['April', 'May', 'June'],
                q3: ['July', 'August', 'September'],
                q4: ['October', 'November', 'December'],
            };
            return map[q.toLowerCase()];
        };

        const months = getMonthsByQuarter(quarter);
        if (!months) {
            return res.status(400).json({ status: 400, message: "Invalid quarter" });
        }

        // حفظ في قاعدة البيانات
        const newQuarter = await quarterModel.create({
            year,
            quarter: quarter.toUpperCase(),
            months
        });
        newQuarter.save();
        console.log(newQuarter);

        return res.json({
            status:200,
            message:newQuarter
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Server error" });
    }
};

/**
 * @type {import("express").RequestHandler}
 */

module.exports.DeleteQuarter = async(req,res)=>{
    try {
        const {quarterId} = req.params;
        console.log(quarterId);
        const deleteQuarter = await quarterModel.findByIdAndDelete(quarterId);
        if(!deleteQuarter){
            req.flash("error","something want error");
            return res.redirect("/admin?tab=quarters")
        }
        deleteQuarter;
        req.flash("success",`the quarter ${deleteQuarter.quarter} in ${deleteQuarter.year} has been deleted !`);
        return res.redirect("/admin?tab=quarters")

    } catch (error) {
        console.log(error);
    }
}