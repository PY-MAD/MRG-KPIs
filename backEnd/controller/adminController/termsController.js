const termsModel = require("../../models/termsModel");
const {getDepartment} = require("./departmentController");
/**
 * @type {import("express").RequestHandler}
 */
module.exports.POSTterms = (req,res)=>{
    try {
        const {name,weight,departmentId} = req.body;
    } catch (error) {
        console.log(error)
    }
}