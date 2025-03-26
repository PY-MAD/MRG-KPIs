const router = require("express").Router();
const usersRouter = require("./usersRouter");
const departmentRouter = require("./departmentRouter");


// router users admin
router.use("/",usersRouter);
router.use("/",departmentRouter);

module.exports = router;