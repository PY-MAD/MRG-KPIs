const usersModel = require("../../models/usersModel");
/**
 * update user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.updateUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {isAdmin , isBlocked } = req.body;
        await usersModel.findByIdAndUpdate(userId,{
            isAdmin:isAdmin != undefined ? true:false,
            isBlocked:isBlocked != undefined ? true:false,
        })
        return res.redirect("/admin?tab=users")
    } catch (error) {
        console.log(error);
    }
}

/**
 * DELETE user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.deleteUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        await usersModel.findOneAndDelete(userId);
        return res.redirect("/admin?tab=users")
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.getUsers = async(req,res)=>{
    try {
        const users = await usersModel.find();
        return res.json(users);
    } catch (error) {
        console.log(error);
    }
}