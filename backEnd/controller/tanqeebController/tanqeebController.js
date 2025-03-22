const ApplicationModel = require("../../models/ApplicationModel");

module.exports.dashboard = (async(req, res) => {
    const findAllApplecation = await ApplicationModel.find();
    res.render("tanqeeb/dashboard",
        {
            title: "Dashboard",
            layout: "../layout.ejs",
            activePage: "Dashboard",
            user: req.session.user,
            application:findAllApplecation
        }
    );
})
module.exports.JobsAds = async(req, res) => {
    try {
        const findAllFetches = await ApplicationModel.find();
        res.render("tanqeeb/JobsAds",
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
    res.render("tanqeeb/orders",
        {
            title: "Orders",
            layout: "../layout.ejs",
            activePage: "Orders",
            user: req.session.user,
            applications:findAllFetches
        }
    );
})
module.exports.target = ((req, res) => {
    res.render("tanqeeb/target",
        {
            title: "Target",
            layout: "../layout.ejs",
            activePage: "Target",
            user: req.session.user
        }
    );
})