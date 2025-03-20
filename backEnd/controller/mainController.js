const ApplicationModel = require("../models/ApplicationModel");

module.exports.dashboard = ((req, res) => {
    res.render("main",
        {
            title: "Dashboard",
            layout: "../layout.ejs",
            activePage: "Dashboard",
            user: req.session.user,
        }
    );
})
module.exports.profile = ((req, res) => {
    res.render("profile",
        {
            title: "Profile",
            layout: "../layout.ejs",
            activePage: "Profile",
            user: req.session.user
        }
    );
})
module.exports.jobsAds = async(req, res) => {
    try {
        const findAllFetches = await ApplicationModel.find();
        res.render("jobsAds",
            {
                title: "Jobs Ads",
                layout: "../layout.ejs",
                activePage: "Jobs Ads",
                user: req.session.user,
                applications:findAllFetches
            }
        );
    } catch (error) {
        
    }
}
module.exports.orders = (async(req, res) => {
    const findAllFetches = await ApplicationModel.find();
    res.render("orders",
        {
            title: "Orders",
            layout: "../layout.ejs",
            activePage: "Orders",
            user: req.session.user,
            applications:findAllFetches
        }
    );
})