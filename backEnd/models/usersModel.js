const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        require:true,
        type:String,
        unique:true
    },
    name:{
        require:true,
        type:String
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now
    },
    isValidated:{
        type:Boolean,
        default:false,
        require:true,
    },
    
})

module.exports = mongoose.model("users",userSchema);