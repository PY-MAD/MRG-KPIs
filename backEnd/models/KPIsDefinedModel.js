const mongoose = require("mongoose");
const KPIsDefinedModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userManger:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    department:{
        type:String,
        required:true
    },
    startDate:{
        required:true,
        type:Date
    },
    endDate:{
        required:true,
        type:Date
    },
    isAvailable:{
        required:true,
        default :true,
        type:Boolean
    }
    
})

module.exports = mongoose.model("KPIsDefined",KPIsDefinedModel);