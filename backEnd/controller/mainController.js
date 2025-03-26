const ApplicationModel = require("../models/ApplicationModel");
const usersModel = require("../models/usersModel");
const departmentModel = require("../models/departmentsModel");
module.exports.dashboard = ((req, res) => {
    res.render("tanqeeb/dashboard",
        {
            title: "Dashboard",
            layout: "../layout.ejs",
            activePage: "Dashboard",
            user: req.user,
        }
    );
})
module.exports.profile = ((req, res) => {
    res.render("profile",
        {
            title: "Profile",
            layout: "../layout.ejs",
            activePage: "Profile",
            user: req.user,
            message: {
                error: req.flash("error"),
                success: req.flash("success")
            }
        }
    );
})
module.exports.JobsAds = async(req, res) => {
    try {
        const findAllFetches = await ApplicationModel.find();
        res.render("tanqeeb/tanqeeb/JobsAds",
            {
                title: "Jobs Ads",
                layout: "../layout.ejs",
                activePage: "Jobs Ads",
                user: req.user,
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
            user: req.user,
            applications:findAllFetches,
            message: {
                error: req.flash("error"),
                success: req.flash("success")
            }
        }
    );
})
module.exports.target = ((req, res) => {
    res.render("tanqeeb/target",
        {
            title: "target",
            layout: "../layout.ejs",
            activePage: "target",
            user: req.user,
        }
    );
})
module.exports.admin = async (req, res) => {
    const activeTab = req.query.tab || 'users';
    const findDepartment = await departmentModel.find();
    const findUser = await usersModel.find();

    let data;

    switch (activeTab) {
        case "users":
            data = findUser;
            break;

        case "departments":
            data = findDepartment.map((item) => {
                const manager = findUser.find(user => user._id.toString() === item.mangerDepartment?.toString());
                return {
                    ...item.toObject(),
                    username: manager ? manager.name : ""
                };
            });
            break;
    }

    res.render("admin", {
        title: "Admin",
        layout: "../layout.ejs",
        activePage: "Admin",
        user: req.user,
        isActive: activeTab,
        data: data
    });
};