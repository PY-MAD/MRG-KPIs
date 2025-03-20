const mongoose = require("mongoose");
const ApplicationModel= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    countOfApplications:{
        type:mongoose.Schema.Types.Int32,
        require:true
    },
    path:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now
    },
})

module.exports = mongoose.model("Applications",ApplicationModel);