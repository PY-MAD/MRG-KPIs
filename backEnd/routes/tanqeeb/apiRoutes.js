const router = require("express").Router();
const apiController = require("../../controller/tanqeebController/apiController");

//getFiles
router.get("/apiFetchData/:id",apiController.GETReadFile);

module.exports = router;