const router = require("express").Router();
const targetController = require("../../controller/tanqeebController/targetController");


router.get("/add",targetController.GETaddTarget);

module.exports = router;