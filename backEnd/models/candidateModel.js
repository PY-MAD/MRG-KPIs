const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    applicationId:{type:mongoose.SchemaTypes.ObjectId, required:true},
    name: { type: String, required: true },
    job_title: { type: String, required: true },
    age: { type: String, required: true },
    experience: { type: String, required: true },
    nationality: { type: String, required: true },
    city: { type: String, default: "Not Available" },
    phone: { type: String, default: "Not Available" },
    email: { type: String, default: "Not Available" },
    about: { type: String },
    minimum_salary: { type: String, default: "Not Disclosed" },
    cv_link: { type: String, default: "Not Available" },
    url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Candidate", CandidateSchema);
