const router = require("express").Router();
const mainController = require("../controller/mainController");
const { isAuth } = require("../middleware/authMiddleware");
const {dashboard} = require("../controller/tanqeebController/tanqeebController")
const salesKPIsRouter = require("./salesKPIs/viewsRouter")
//dashbaord
router.get("/",isAuth,dashboard)

// profile
router.get("/Profile",isAuth, mainController.profile)

//admin
router.get("/Admin",isAuth, mainController.admin)

//sales KPIs
router.use("/salesKPIs",isAuth,salesKPIsRouter);



module.exports = router;