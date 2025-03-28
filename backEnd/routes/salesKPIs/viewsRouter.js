const router = require("express").Router();
const {GETdashboardView} = require("../../controller/salesKPIsController/mainController");
const {GETtargetView, getUsers,POSTNewTarget,GETdetailTarget} = require("../../controller/salesKPIsController/targetController");
router.get("/dashboard",GETdashboardView);
router.get("/target",GETtargetView);
router.get("/target/users",getUsers)
router.get("/target/:id",GETdetailTarget)

// add new Target
router.post("/target/add",POSTNewTarget)
module.exports = router;
