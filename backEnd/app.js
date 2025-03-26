const express = require("express")
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
require('dotenv').config(".env");
const session = require("express-session");
const flash = require("express-flash");

const nodemailer = require('nodemailer');

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server); // ✅ Main Socket.io instance



app.use(session({
    secret: "MAD",
    resave: false,
    saveUninitialized: true
}));

//mailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.office365.com",
    port: 587,
    secure: false, // `true` for port 465, `false` for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
module.exports = { server, app, io ,transporter};
app.use(methodOverride('_method'))
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.json())


const db = require("./config/db");
// Set views and layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontEnd/views/pages")); // Adjust if needed
app.use("/assets", express.static(path.join(__dirname,"../frontEnd/assets")));



const mainRoutes = require("./routes/mainRoutes");
const tanqeeb = require("./routes/tanqeeb/tanqeebRoutes");
const auth = require("./routes/authRoutes");
app.use("/", mainRoutes)
app.use("/tanqeeb",tanqeeb)
app.use("/auth",auth)


server.listen(3000 , () => {
    console.log("🚀 Server running on http://localhost:"+3000);
});