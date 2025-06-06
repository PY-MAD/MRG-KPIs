const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const termsModel = new Schema({
    name:{
        require:true,
        type:String
    },
    departmentId:{
        require:true,
        type:[Schema.ObjectId],
    },
    weight:{
        require:true,
        type:Number
    }
});
module.exports = mongoose.model('terms',termsModel);