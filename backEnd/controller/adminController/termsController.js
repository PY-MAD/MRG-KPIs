const termsModel = require("../../models/termsModel");
const {getDepartment} = require("./departmentController");
/**
 * @type {import("express").RequestHandler}
 */
module.exports.POSTterms = async(req,res)=>{
    try {
        const {name,departments,weight} = req.body;
        const createNewTerm = await termsModel.create({
            name:name,
            departmentId:departments,
            weight:weight
        })
        createNewTerm.save();
        return res.redirect("/Admin?tab=terms")
    } catch (error) {
        console.log(error)
    }
}
/**
 * @type {import("express").RequestHandler}
 */
module.exports.PUTterm = async(req,res)=>{
    try {
        const {name,departments,weight} = req.body;
        const {termId} = req.params;
        const findTerm = await termsModel.findById(termId);
        if(!findTerm){
            req.flash("error","we can't find the term !");
            return res.redirect("/Admin?tab=terms")
        }
        if(!name || !departments || !weight){
            req.flash("error","something missing.");
            return res.redirect("/Admin?tab=terms")
        }
        const updateTerm = await termsModel.findByIdAndUpdate(termId,{
            name:name,
            departmentId:departments,
            weight:weight
        })
        console.log(updateTerm);
        req.flash("success",`the ${name} has been updated !`)
        return res.redirect("/Admin?tab=terms")
    } catch (error) {
        console.log(error)
    }
}