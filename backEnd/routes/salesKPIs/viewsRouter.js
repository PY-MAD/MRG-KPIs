const router = require("express").Router();
const {GETdashboardView,GETSalesKPIs,GETtableKPIs,GETapiKPIsDashbaord} = require("../../controller/salesKPIsController/mainController");
const {GETtargetView, getUsers,POSTNewTarget,GETdetailTarget,PUTKPIs} = require("../../controller/salesKPIsController/targetController");
router.get("/dashboard",GETdashboardView);
router.get("/",GETSalesKPIs)
router.get("/api/kpis/dashboard",GETapiKPIsDashbaord)




// target
router.get("/target",GETtargetView);
router.get("/target/users",getUsers)
router.get("/target/:id",GETdetailTarget)

// add new Target
router.post("/target/add",POSTNewTarget)


router.get("/:id",GETtableKPIs)
router.put("/target/update/:id",PUTKPIs)
module.exports = router;
