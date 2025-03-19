const express = require("express")
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");

// watch frontEndChange
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "../frontEnd/views");

app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
require('dotenv').config(".env");

const db = require("./config/db");
// Set views and layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontEnd/views/pages")); // Adjust if needed
app.use("/assets",express.static("../frontEnd/assets"));


const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/",mainRoutes)
app.use("/auth",authRoutes)


app.listen(3000,()=>{
    console.log("we are listen here : localhost:3000")
})