const express = require("express")
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

// Set views and layout
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontEnd/views")); // Adjust if needed


app.get("/",(req,res)=>{
    res.render("main");
})

app.listen(3000,()=>{
    console.log("we are listen here : localhost:3000")
})