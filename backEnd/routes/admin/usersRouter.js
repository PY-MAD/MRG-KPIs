const router = require("express").Router();
const usersController = require("../../controller/adminController/usersController");
// change stateUser
router.put("/blockedUser/:userId",usersController.isBlocked);
router.put("/adminUser/:userId",usersController.isAdmin);
//delete user
router.delete("/delete/:userId",usersController.deleteUser)

// getUsers
router.get("/users",usersController.getUsers)
module.exports = router;