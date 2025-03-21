const scrapeApplicants = require("../../api/getOrders");
const ApplicationModel = require("../../models/ApplicationModel");
const fs = require("fs");
const path = require("path");

//**
// GET add Page
//  */

module.exports.GETAddJobsAdsPage = (req,res)=>{
    res.render("tanqeeb/jobsAds/add",
        {
            title:"add new application",
            layout:"../layout.ejs",
            activePage:"Jobs Ads",
            user:req.session.user,
        }
    );
}
module.exports.POSTAddJobsAdsPage = async(req,res)=>{
    const {floating_name,floating_email,floating_password,floating_url} = req.body;
    if(!floating_name || !floating_email || !floating_password || !floating_url){
        req.flash("please fill all the inputs !");
        return res.redirect("/JobsAds/addNewApplication");
    }

    const fileName = await scrapeApplicants(floating_url,floating_email,floating_password)
    if (!fileName) {
        req.flash("error", "Failed to extract job data.");
        return res.redirect("/JobsAds/addNewApplication");
    }
    await ApplicationModel.create({
        name:floating_name,
        email:floating_email,
        password:floating_password,
        url:floating_url,
        path:fileName.file,
        countOfApplications:fileName.count
    })
    res.redirect("/JobsAds")
}

/**
 * DELETE job application from database 
 */

module.exports.DeleteJobsAds = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting Job ID:", id);

    try {
        const findTheJobs = await ApplicationModel.findById(id);

        if (!findTheJobs) {
            console.log("❌ Job not found!");
            return res.status(404).json({ message: "Job not found!" });
        }

        // ✅ Correct File Path
        const filePath = path.join(__dirname, "../api/data/" + findTheJobs.path);

        // ✅ Delete the File (Use fs.promises.unlink)
        try {
            await fs.promises.unlink(filePath);
            console.log(`🗑️ Deleted file: ${filePath}`);
        } catch (fileError) {
            console.error("⚠️ File deletion error:", fileError);
        }

        // ✅ Delete from Database
        await ApplicationModel.findByIdAndDelete(id);
        console.log("✅ Job deleted successfully!");

        res.redirect("/JobsAds"); // Redirect back to JobsAds page
    } catch (error) {
        console.error("❌ Error deleting job:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};