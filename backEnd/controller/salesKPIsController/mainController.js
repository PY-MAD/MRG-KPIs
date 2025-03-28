/**
 * GET Dashboard Sales KPIs
 */

module.exports.GETdashboardView = (req,res)=>{
    res.render("salesKPIs/dashboard",{
        title: "Sales KPIs Dashboard",
        layout: "../layout.ejs",
        activePage: "Sales KPIs Dashboard",
        user: req.user,
    })
}
