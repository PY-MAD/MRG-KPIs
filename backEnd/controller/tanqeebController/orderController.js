const applicationsModel = require("../../models/ApplicationModel");
const candidateModel = require("../../models/candidateModel");
const ApplicationModel = require("../../models/ApplicationModel");
const { deleteFile, isExistFile } = require("../../services/apiFileServices");
const scrapeApplicants = require("../../api/getOrders");
const fs = require("fs");
/**
 * GET orders
 */
module.exports.GETordersView = async (req, res) => {
    try {
        const { order } = req.params;
        const findApplication = await applicationsModel.findById(order);
        if (!findApplication) {
            req.flash("error", "Can't find the application, please re-add it here.");
            return res.redirect("/tanqeeb/JobsAds");
        }

        const findInCandidateMdoel = await candidateModel.find({
            applicationId:findApplication._id
        });
        if(!findInCandidateMdoel.length){
            await AddInDatabase(findApplication,order);
        }
        if(findInCandidateMdoel.length != findApplication.countOfApplications){
            await candidateModel.deleteMany({
                applicationId:findApplication._id
            })
            await AddInDatabase(findApplication,order);
        }
        return res.render("tanqeeb/order/listOrder",
            {
                title: "order - "+findApplication.name,
                layout: "../layout.ejs",
                activePage: "Orders",
                user: req.user,
                candidate:findInCandidateMdoel
            }
        );
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

async function AddInDatabase(findApplication,order){
    
    const checkFile = isExistFile(findApplication.path);

    // ✅ Check if the file exists
    if (checkFile.status == 404) {
        console.error("❌ File not found:", checkFile.data);
        req.flash("error", "File not found, please check the application data.");
        return res.redirect("/tanqeeb/JobsAds");
    }

    const readFile = fs.readFileSync(checkFile.data, "utf8");

    // ✅ Check if `data` is an object (not an array)
    if (Array.isArray(readFile)) {
        console.error("❌ JSON file contains an array instead of an object.");
        return res.status(500).send("Invalid data format.");
    }

    // ✅ Pass a valid template name and data
    const data = JSON.parse(readFile)
        await candidateModel.insertMany(
            data.map(item => ({
                applicationId: order,
                name: item.الاسم,
                job_title: item.الوظيفة,
                age: item.العمر,
                experience: item.الخبرة,
                nationality: item.الجنسية,
                city: item.المدينة,
                phone: item.الجوال,
                about: item.نبذة,
                minimum_salary: item.الحد_الأدنى_للراتب,
                cv_link: item.رابط_السيرة_الذاتية,
                url: item.رابط_الصفحة
            }))
        );
    return {
        status:200,
        msg:"done"
    }

}


module.exports.reFetchData = async(req,res)=>{
    try {
        const {order} = req.params;
        const {email,password,url,path,name} = await ApplicationModel.findById(order);
        const isDeleteFiled = deleteFile(path);
        if(isDeleteFiled.status == 404){
            return isDeleteFiled.data;
        }
        const fileName = await scrapeApplicants(url,email,password);
        if (!fileName) {
            req.flash("error", "Failed to extract job data.");
            return res.redirect("/tanqeeb/Orders");
        }
        await ApplicationModel.findByIdAndUpdate(order,{
            path:fileName.file,
            countOfApplications:fileName.count
        })
        req.flash("success", "updated files was success : "+ name);
        res.redirect("/tanqeeb/orders");
    } catch (error) {
        console.error(error);
    }
}

