const departmentsModel = require("../../models/departmentsModel");
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
        console.log(finalResult);
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

/**
 * @type {import('express').RequestHandler}
 */
module.exports.PUTdepartment = async(req,res)=>{
    try {
        const {name,departmentManger} = req.body;
        const {departmentId} = req.params;
        const findDepartment = await departmentModel.findById(departmentId);
        if(!findDepartment){
            req.flash("error","department not found !");
            return res.redirect("/Admin?tab=departments") 
        }
        if(!name || !departmentManger){
            req.flash("error","something missing !");
            return res.redirect("/Admin?tab=departments") 
        }
        const updateDepartment = await departmentsModel.findByIdAndUpdate(departmentId,
            {
                name:name,
                mangerDepartment:departmentManger
            }
        )
        console.log(updateDepartment)
        req.flash("success",`the ${name} department has been updated !`)
        return res.redirect("/Admin?tab=departments")
    } catch (error) {
        
    }
}