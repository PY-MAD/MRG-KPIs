/**
 * GET Dashboard Sales KPIs
 */

module.exports.GETdashboardView = (req,res)=>{
    res.render("salesKPIs/dashboard",{
        title: "Sales KPIs Dashboard",
        layout: "../layout.ejs",
        activePage: "Sales KPIs Dashboard",
        user: req.session.user,
    })
}
module.exports.GETtargerView = (req,res)=>{
    res.render("salesKPIs/target",{
        title: "Sales KPIs Target",
        layout: "../layout.ejs",
        activePage: "Sales KPIs Target",
        user: req.session.user,
    })
}