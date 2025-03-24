/**
 * GET add Page
 */
module.exports.GETaddTarget = (req,res)=>{
    res.render("tanqeeb/target/add",{
        title:"new target",
        layout:"../layout.ejs",
        activePage:"Target",
        user:req.session.user,
    })
}