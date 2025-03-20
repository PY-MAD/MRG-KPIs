const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const apiController = require("../controller/apiController");

//getFiles
router.get("/apiFetchData/:id",apiController.GETReadFile);

module.exports = router;