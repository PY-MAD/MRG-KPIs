const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    required: true
  },
  achieved: {
    type: Number,
    default: 0
  },
  target: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const kpiSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  quarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quarter",
    required: true,
  },
  startDate:{
    type:String,
  },
  endDate:{
    type:String,
  },
  salesTarget:{
    type:Number,
    require:true
  },
  months:[monthSchema]
});

module.exports = mongoose.model("KPI", kpiSchema);