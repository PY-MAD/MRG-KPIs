const router = require("express").Router();
const salesController = require("../../controller/salesKPIsController/mainController");

router.get("/dashboard",salesController.GETdashboardView);
router.get("/target",salesController.GETtargerView);

module.exports = router;
