const router = require("express").Router();
const mainController = require("../controller/mainController");
const { isAuth } = require("../middleware/authMiddleware");
const {dashboard} = require("../controller/tanqeebController/tanqeebController")
const salesKPIsRouter = require("./salesKPIs/viewsRouter")
const routerAdmin = require("./admin/adminRouter");
const { isAdmin } = require("../middleware/adminMiddleweare");

//dashbaord
router.get("/",isAuth,dashboard)

// profile
router.get("/Profile",isAuth, mainController.profile)

//admin
router.get("/Admin",[isAuth, isAdmin], mainController.admin)
router.use("/Admin",[isAuth, isAdmin],routerAdmin)

//sales KPIs
router.use("/salesKPIs",isAuth,salesKPIsRouter);



module.exports = router;