const mongoose = require("mongoose");

// user collection schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: Number,
    country: String,
    expYear: Number,
    expMonth: Number,
    skills: String,
    currEmp: String,
    currLocation: String,
    currJobDesc: String,
    currExp: Number,
    prevEmp: String,
    prevJobDesc: String,
    prevExp: Number,
    college: String,
    collegeYear: String,
    graduate: String,
    gradSchool: String,
    schoolYear: Number,
    qualification: String,
    certificate: String,
    appliedJobs: Array,
    savedJobs: Array
});

module.exports = mongoose.model("User", userSchema);