module.exports.isAuth = (req,res,next)=>{
    const { user } = req.session;
    if (user) {
        if(user.isBlocked == true){
            req.flash("error","sorry , your account has been blocked");
            return res.redirect("/auth/login");
        }
        req.user = user;

        next();
    }else{
        req.flash("error","you must be logged in to access to the page");
        res.redirect("/auth/login");
    }
}