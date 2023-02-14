const mongoose = require('mongoose');

// job collection schema
var jobSchema = new mongoose.Schema({
    jobId: String,
    jobTitle: String,
    postDate: String,
    role: String,
    responsibility: String,
    compName: String,
    exp: Number,
    salaryR: String,
    noPos: Number,
    location: String,
    skills: String,
    degree: String,
    compInfo: String,
    empType: String,
    indType: String,
    keyword: String,
    jobDesc: String
});

module.exports = mongoose.model('Job',jobSchema);