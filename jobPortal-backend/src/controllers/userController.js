const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserDetail = require("../models/user.model");
const JobDetail = require("../models/job.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

// to register
router.post("/register", async (req, res) =>{

    // email exist check
    const emailExist = await UserDetail.findOne({
        email: req.body.email
    });

    // encrypt password
    if(emailExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserDetail({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        address1: req.body.addr1,
        address2: req.body.addr2,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        expYear: req.body.expYear,
        expMonth: req.body.expMonth,
        skills: req.body.skills,
        currEmp: req.body.currEmp,
        currLocation: req.body.currLoc,
        currJobDesc: req.body.currJobDesc,
        currExp: req.body.currExp,
        prevEmp: req.body.prevEmp,
        prevJobDesc: req.body.prevJobDesc,
        prevExp: req.body.prevExp,
        college: req.body.college,
        collegeYear: req.body.collegeYear,
        graduate: req.body.graduate,
        gradSchool: req.body.gradSchool,
        schoolYear: req.body.schoolYear,
        qualification: req.body.qualification,
        certificate: req.body.certificate
    });

    try{   
        const userSaved = await user.save();
        res.send(userSaved);
    } catch (error) {
        res.status(400).send(error);
    }
});

// to login
router.post("/login", async (req, res) => {

    // email check
    const user = await UserDetail.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email not found");

    // password check
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Password");

    // token creation
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({token: token, id: user._id});
});

// to display user detail
router.get('/:id', async (req,res) => {
    try {
        const userDetail = await UserDetail.findById(req.params.id);
        res.json(userDetail);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// "certificate": "gr",
// "college": "g",
// "collegeYear": "2020",
// "gradSchool": "g",
// "graduate": "yes",
// "qualification": "t",
// "schoolYear": "2"

// to update saved job
router.post('/savedJob/:user/:job', async(req, res) => {
    const userId = req.params.user;
    const jobId = req.params.job;
    try {
        const userJobSaved = await UserDetail.findByIdAndUpdate({_id: userId},{$addToSet: {"savedJobs": jobId}});
        res.json(userJobSaved);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// to delete saved job
router.delete('/savedJob/:user/:job', async(req, res) => {
    const userId = req.params.user;
    const jobId = req.params.job;
    try {
        const userJobSaved = await UserDetail.findByIdAndUpdate({_id: userId},{$pull: {"savedJobs": jobId}});
        res.json(userJobSaved);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});


// to update applied job
router.post('/appliedJob/:user/:job', async(req, res) => {
    const userId = req.params.user;
    const jobId = req.params.job;
    try {
        const userJobSaved = await UserDetail.findByIdAndUpdate({_id: userId},{$addToSet: {"appliedJobs": jobId}});
        res.json(userJobSaved);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// to delete applied job
router.delete('/appliedJob/:user/:job', async(req, res) => {
    const userId = req.params.user;
    const jobId = req.params.job;
    try {
        const userJobSaved = await UserDetail.findByIdAndUpdate({_id: userId},{$pull: {"appliedJobs": jobId}});
        res.json(userJobSaved);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

router.get('/saveJobList/:id', async (req,res) => {
    try {
        const userDetail = await UserDetail.findById({_id: req.params.id},{savedJobs: 1});
        let saveList = [];
        // console.log(userDetail.savedJobs.length);
        for(let i= 0; i< userDetail.savedJobs.length; i++){
            const saveDetail = await JobDetail.findById(userDetail.savedJobs[i]);
            saveList.push(saveDetail);
        }
        res.json(saveList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

router.get('/applyJobList/:id', async (req,res) => {
    try {
        const userDetail = await UserDetail.findById({_id: req.params.id},{appliedJobs: 1});
        let applyList = [];
        // console.log(userDetail.savedJobs.length);
        for(let i= 0; i< userDetail.appliedJobs.length; i++){
            const applyDetail = await JobDetail.findById(userDetail.appliedJobs[i]);
            applyList.push(applyDetail);
        }
        res.json(applyList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

module.exports = router;
