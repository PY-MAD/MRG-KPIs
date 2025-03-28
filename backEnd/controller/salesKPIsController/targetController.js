const usersModel = require("../../models/usersModel");
const KPIsDefinedModel = require("../../models/KPIsDefinedModel");
/**
 * GET users 
 */
module.exports.GETtargetView = async (req, res) => {
    try {
        // Find all Sales KPIs
        const findSalesKPIs = await KPIsDefinedModel.find({ department: "Sales" });

        // Extract userManager IDs from Sales KPIs
        const userManagerIds = findSalesKPIs.map(kpi => kpi.userManger);

        // Fetch users by IDs
        const findUsers = await usersModel.find({ _id: { $in: userManagerIds } });

        // Map user IDs to their names
        const userMap = new Map(findUsers.map(user => [user._id.toString(), user.name]));

        // Add user names to the KPIs array
        const salesKPIsWithUsers = findSalesKPIs.map(kpi => ({
            ...kpi._doc,
            userMangerName: userMap.get(kpi.userManger.toString()) || "Unknown"
        }));

        res.render("salesKPIs/target", {
            title: "Sales KPIs Target",
            layout: "../layout.ejs",
            activePage: "Sales KPIs Target",
            user: req.user,
            salesKPIs: salesKPIsWithUsers
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
 */
module.exports.POSTNewTarget = async(req,res)=>{
    try {
        const {name,userResponse,startDate,endDate} = req.body;
        if(!name || !userResponse || !startDate || !endDate){
            req.flash("error","the input's must be filled !");
            return res.redirect("/salesKPIs/target")
        }
        console.log("user email : "+userResponse)
        const findUserId = await usersModel.findOne({
            email:userResponse
        });
        console.log(findUserId);
        await KPIsDefinedModel.create({
            name:name,
            userManger:findUserId._id,
            startDate:startDate,
            endDate:endDate,
            department:"Sales"
        });
        return res.redirect("/salesKPIs/target/");
    } catch (error) {
        req.flash("error"+error);
        console.error(error);
        return res.redirect("/salesKPIs/target/");
    }

}