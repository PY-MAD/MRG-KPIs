/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
module.exports.isAdmin = (req,res,next)=>{
    const user = req.user;
    if (user.isAdmin) {
        next();
    }else{
        return res.status(403).send("Error ; you don't have access to get here !");
    }
}