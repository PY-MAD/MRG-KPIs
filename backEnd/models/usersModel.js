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
    }
})

module.exports = mongoose.model(userSchema,"users");