/**
 * GET Login auth page
 */
module.exports.GETloginPage = (req,res)=>{
    res.render("auth/login",{
        title:"Login",
        layout:"../layout.ejs",
        activePage:"Login"
    })
}
/**
 * POST Login auth page
 */
module.exports.POSTLogin = (req,res)=>{
    const {email,password} = req.body;
} 



/**
 * GET signUp auth page
 */
module.exports.GETsignUpPage = (req,res)=>{
    res.render("auth/signUp",{
        title:"SignUp",
        layout:"../layout.ejs",
        activePage:"SignUp"
    })
}