const express = require("express")
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
var methodOverride = require('method-override')
require('dotenv').config(".env");
const session = require("express-session");
const flash = require("express-flash");

const senderMail = require("express-mailer");

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server); // ✅ Main Socket.io instance

module.exports = { server, app, io };

app.use(session({
    secret: "MAD",
    resave: false,
    saveUninitialized: true
}));

//mailer
senderMail.extend(app, {
    from: process.env.EMAIL_FROM,
    host: process.env.EMAIL_HOST || "smtp.office365.com",
    secureConnection: false,
    port: 587,
    transportMethod: "SMTP",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.use(methodOverride('_method'))
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);


const db = require("./config/db");
// Set views and layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontEnd/views/pages")); // Adjust if needed
app.use("/assets", express.static("../frontEnd/assets"));


const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const jobsAdsRoutes = require("./routes/jobsAdsRouter");
const orderRoutes = require("./routes/orderRoutes");
app.use("/", mainRoutes)
app.use("/api", apiRoutes)
app.use("/auth", authRoutes)
app.use("/JobsAds", jobsAdsRoutes)
app.use("/Orders", orderRoutes)


server.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});