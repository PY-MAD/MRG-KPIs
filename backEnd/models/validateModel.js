const mongoose = require("mongoose");
const validateModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        require:true,
    },
    validateCode:{
        type:String,
        require:true
    },
    validateToken:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now
    },
})

module.exports = mongoose.model("validation",validateModel);