const router = require("express").Router();
const termsController = require("../../controller/adminController/termsController")


router.post("/addTerm",termsController.POSTterms);
router.put("/updateTerm/:termId",termsController.PUTterm)
module.exports = router;