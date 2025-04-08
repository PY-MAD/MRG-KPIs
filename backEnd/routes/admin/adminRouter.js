const router = require("express").Router();
const usersRouter = require("./usersRouter");
const departmentRouter = require("./departmentRouter");
const termRouter = require("./termRouter");
const quarterRouter = require("./quarterRouter");
// router users admin
router.use("/",usersRouter);
router.use("/",departmentRouter);
router.use("/",termRouter);
router.use("/",quarterRouter)
module.exports = router;