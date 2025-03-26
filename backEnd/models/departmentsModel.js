const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const departmentsSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    mangerDepartment:{
        type:Schema.ObjectId,
        require:true
    }
})

module.exports = mongoose.model("departments",departmentsSchema);