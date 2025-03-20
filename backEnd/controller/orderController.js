const applicationsModel = require("../models/ApplicationModel");
const path = require("path");
const fs = require("fs");
const candidateModel = require("../models/candidateModel")
/**
 * GET orders
 */
module.exports.GETordersView = async (req, res) => {
    try {
        const { order } = req.params;
        const findApplication = await applicationsModel.findById(order);
        if (!findApplication) {
            req.flash("error", "Can't find the application, please re-add it here.");
            return res.redirect("/JobsAds");
        }

        const findInCandidateMdoel = await candidateModel.find({
            applicationId:findApplication._id
        });
        console.log(findInCandidateMdoel);
        if(!findInCandidateMdoel.length){
            await AddInDatabase(findApplication,order);
        }
        return res.render("order/listOrder",
            {
                title: "order - "+findApplication.name,
                layout: "../layout.ejs",
                activePage: "Orders",
                user: req.session.user,
                candidate:findInCandidateMdoel
            }
        );
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

async function AddInDatabase(findApplication,order){
    
    const setValuePath = path.join(__dirname, "../api/data", findApplication.path);

    // ✅ Check if the file exists
    if (!fs.existsSync(setValuePath)) {
        console.error("❌ File not found:", setValuePath);
        req.flash("error", "File not found, please check the application data.");
        return res.redirect("/JobsAds");
    }

    const readFile = fs.readFileSync(setValuePath, "utf8");

    // ✅ Check if `data` is an object (not an array)
    if (Array.isArray(readFile)) {
        console.error("❌ JSON file contains an array instead of an object.");
        return res.status(500).send("Invalid data format.");
    }

    // ✅ Pass a valid template name and data
    const data = JSON.parse(readFile)
    for(let item in data){
        console.log(data[item].الاسم)
        await candidateModel.create({
            applicationId:order,
            name:data[item].الاسم ,
            job_title:data[item].الوظيفة ,
            age: data[item].العمر,
            experience:data[item].الخبرة ,
            nationality:data[item].الجنسية ,
            city:data[item].المدينة ,
            phone:data[item].الجوال ,
            about: data[item].نبذة,
            minimum_salary:data[item].الحد_الأدنى_للراتب,
            cv_link:data[item].رابط_السيرة_الذاتية,
            url: data[item].رابط_الصفحة

        })
        // await candidateModel.create()
    }
    return {
        status:200,
        msg:"done"
    }

}
