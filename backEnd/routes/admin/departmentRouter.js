const router = require("express").Router();
const departmentsController = require("../../controller/adminController/departmentController");

router.post("/addDepartments",departmentsController.POSTnewDepartments)

router.get("/getDepartments",departmentsController.getDepartments);

router.delete("/deleteDepartment/:departmentId",departmentsController.deleteDepartment);
module.exports = router;