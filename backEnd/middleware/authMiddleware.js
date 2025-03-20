module.exports.isAuth = (req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        req.flash("error","you must be logged in to access to the page");
        res.redirect("/auth/login");
    }
}