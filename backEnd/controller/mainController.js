module.exports.dashboard = ((req,res)=>{
    res.render("main",
        {
            title:"Dashboard",
            layout:"../layout.ejs",
            activePage:"Dashboard"
        }
    );
})
module.exports.profile = ((req,res)=>{
    res.render("profile",
        {
            title:"Profile",
            layout:"../layout.ejs",
            activePage:"Profile"
        }
    );
})
module.exports.jobsAds = ((req,res)=>{
    res.render("jobsAds",
        {
            title:"Jobs Ads",
            layout:"../layout.ejs",
            activePage:"Jobs Ads"
        }
    );
})
module.exports.orders = ((req,res)=>{
    res.render("orders",
        {
            title:"Orders",
            layout:"../layout.ejs",
            activePage:"Orders"
        }
    );
})