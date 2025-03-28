const departmentModel = require("../../models/departmentsModel");
const userModel = require("../../models/usersModel");
/**
 * @type {import("express").RequestHandler}
 */
module.exports.POSTnewDepartments = async(req,res)=>{
    try {
        const {departmentName , departmentManager} = req.body;
        if(!departmentName.trim() || !departmentManager.trim()){
            console.log("something missing");
            return res.json({
                status:400,
                message:"something missing"
            });
        }

        const result = await departmentModel.create({
            name:departmentName,
            mangerDepartment:departmentManager
        });
        const findUser = await userModel.findById(result.mangerDepartment);
        const finalResult = {
            ...result._doc,
            mangerName:findUser.name
        }
        res.json({
            status:200,
            message:finalResult
        });
    }catch (e) {
        console.error(e)
    }

}
/**
 * @type {import("express").RequestHandler}
 */
module.exports.getDepartments = async(req,res)=>{
    try {
        const findAllDepartments = await departmentModel.find();
        return res.json(findAllDepartments);
    }catch (e) {
        console.error(e)
    }
}
/**
 * @type {import("express").RequestHandler}
 */
module.exports.deleteDepartment = async(req,res)=>{
    try {
        const { departmentId } = req.params;
        await departmentModel.findByIdAndDelete(departmentId);
        return res.redirect("/Admin?tab=departments")
    }catch (e) {
        console.error(e)
    }
}