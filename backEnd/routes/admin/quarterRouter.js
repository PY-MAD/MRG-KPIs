const router = require("express").Router();
const quarterController = require("../../controller/adminController/quartersController");

router.post("/quarter/add",quarterController.POSTquarter)
router.delete("/quarter/delete/:quarterId",quarterController.DeleteQuarter)
// router.put("/quarter/add",quarterController.POSTquarter)
module.exports = router;