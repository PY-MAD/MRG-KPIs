const usersModel = require("../models/usersModel");
const validateModel = require("../models/validateModel");
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const path = require("path");
const {transporter} = require("../app");
const ejs = require("ejs");

/**
 * GET Login auth page
 */
module.exports.GETloginPage = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        layout: "../layout.ejs",
        activePage: "auth",
        message: {
            error: req.flash("error"),
            success: req.flash("success")
        }
    })
}
/**
 * POST Login auth page
 */
module.exports.POSTLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await usersModel.findOne({
            email: email
        })

        if (!findUser) {
            req.flash("error", "The email or password is incorrect");
            return res.redirect("/auth/login");
        }


        let userPassword = findUser.password;
        const comparePassword = await bcrypt.compare(password, userPassword);
        if (!comparePassword) {
            req.flash("error", "The email or password is incorrect");
            return res.redirect("/auth/login");
        }
        const isValidateUser = findUser.isValidated;
        if (!isValidateUser) {
            req.flash("error", "your account not validated please check your email");
            return res.redirect("/auth/login");
        }
        req.session.user = findUser;
        res.redirect("/");
    } catch (error) {
        throw error;
    }
}



/**
 * GET signUp auth page
 */
module.exports.GETsignUpPage = (req, res) => {
    res.render("auth/signUp", {
        title: "SignUp",
        layout: "../layout.ejs",
        activePage: "auth",
        message: {
            error: req.flash("error"),
            success: req.flash("success")
        }
    })
}
/**
 * POST SignUp auth page
 */
module.exports.POSTSignUp = async (req, res) => {
    try {
        const { name, email, password, confPassword } = req.body;
        if (password != confPassword) {
            req.flash("error", "The passwords do not match!")
            return res.redirect("/auth/signup")
        }
        const cryptedPassword = await bcrypt.hash(password, 15);
        const token = crypto.randomBytes(64).toString('hex');
        const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const newUser = await usersModel.create({
            name: name,
            email: email,
            password: cryptedPassword,
            validateCode: code,
            validateToken: token,
            isAdmin:false,
            isBlocked:false
        })
        const newValidateUser = await validateModel.create({
            userId: newUser.id,
            validateCode: code,
            validateToken: token
        })
        newValidateUser.save();
        newUser.save();
        req.flash("success", "user has been created !")
        module.exports.senderValidationEmail(req, res, email, code, token, name);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



/**
 * GET logout page
 */
module.exports.GETLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect("/");
        }

    })
    req.user = "";
    res.redirect("/auth/login");
}


module.exports.senderValidationEmail = async (req, res, email, code, token, name) => {
    try {
        // Render the EJS template to HTML
        const emailTemplatePath = path.join(__dirname,"../../frontEnd/views/email/templateEmail.ejs");

        const emailHtml = await ejs.renderFile(emailTemplatePath, {
            name: name,
            code: code,
            activationLink: `http://localhost:3000/auth/validationEmail/${token}`,
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Confirm Your Email - MR",
            html: emailHtml,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.redirect(`/auth/validationEmail/${token}`);
    } catch (error) {
        console.error("Error sending email:", error);
        res.send("Error sending email.");
    }
};
module.exports.GETValidateUser = async (req, res) => {
    const { token } = req.params
    const findToken = await validateModel.findOne({
        validateToken: token
    });
    if (!findToken) {
        return res.redirect("/auth/login");
    }
    res.render("auth/validateUser", {
        title: "validate user",
        layout: "../layout.ejs",
        activePage: "auth",
        token: req.params.token
    })

}
/**
 * POST TO CHECK THE VALLATION
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.POSTValidateUser = async (req, res) => {
    const { token } = req.params;
    const { index1, index2, index3, index4, index5, index6 } = req.body;

    const userCode = index1 + index2 + index3 + index4 + index5 + index6;
    try {
        const findToken = await validateModel.findOne({
            validateToken: token
        })
        if (findToken.validateCode != userCode) {
            req.flash("error", "the code is wrong !")
            return res.redirect("/auth/validationEmail/" + token)
        }
        const findUser = await usersModel.findByIdAndUpdate(findToken.userId, {
            isValidated: true
        });
        await validateModel.findByIdAndDelete(findToken._id);
        findUser.save();
        req.flash("success", "your account has been validated !");
        res.redirect("/auth/login");
    } catch (error) {
        console.error(error);
    }

}