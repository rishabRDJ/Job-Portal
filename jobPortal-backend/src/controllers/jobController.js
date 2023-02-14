const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const JobDetail = require("../models/job.model");
// const UserDetail = require("../models/user.model");


// to create
router.post('/', async (req,res) => {
    const jobDetail = new JobDetail({
        jobId: req.body.jobId,
        jobTitle: req.body.jobTitle,
        postDate: req.body.postDate,
        role: req.body.role,
        responsibility: req.body.responsibility,
        compName: req.body.compName,
        exp: req.body.exp,
        salaryR: req.body.salaryR,
        noPos: req.body.noPos,
        location: req.body.location,
        skills: req.body.skills,
        degree: req.body.degree,
        compInfo: req.body.compInfo,
        empType: req.body.empType,
        indType: req.body.indType,
        keyword: req.body.keyword,
        jobDesc: req.body.jobDesc
    });
    try{
        const jobSaved = await jobDetail.save();
        res.send(jobSaved);
    } catch (error) {
        res.status(400).send(error);
    }
});

// to display all
router.get('/', async (req,res) => {
    try {
        const jobList = await JobDetail.find();
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

router.get('/latest', async (req,res) => {
    try {
        const jobList = await JobDetail.find()
        .sort({'_id':-1}).limit(4);
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// to display particular
router.get('/:id', async (req,res) => {
    try {
        const jobList = await JobDetail.findById(req.params.id);
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// to update
router.put('/:id', async (req,res) => {
    try {
        const updatedJobDetail = {
            jobId: req.body.jobId,
            jobTitle: req.body.jobTitle,
            postDate: req.body.postDate,
            role: req.body.role,
            responsibility: req.body.responsibility,
            compName: req.body.compName,
            exp: req.body.exp,
            salaryR: req.body.salaryR,
            noPos: req.body.noPos,
            location: req.body.location,
            skills: req.body.skills,
            degree: req.body.degree,
            compInfo: req.body.compInfo,
            empType: req.body.empType,
            indType: req.body.indType,
            keyword: req.body.keyword,
            jobDesc: req.body.jobDesc
        }
        const jobList = await JobDetail.findByIdAndUpdate({_id: req.params.id}, updatedJobDetail);
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});

    }
});

// // to display particular location
// router.get('/location/:loc', async (req,res) => {
//     try {
//         const loc = req.params.loc;
//         // db.jobs.find({location: "Pune"})
//         const jobList = await JobDetail.find({location: {$regex: '.*' + loc, $options: 'i'}});
//         res.json(jobList);
//     } catch (error) {
//         console.log(error);
//         res.json({ message: error});
//     }
// });

// // to display particular skill
// router.get('/keyword/:key', async (req,res) => {
//     try {
//         const skill = req.params.key;
//         const jobList = await JobDetail.find({keyword: {$regex: '.*' + skill, $options: 'i'}});
//         res.json(jobList);
//     } catch (error) {
//         console.log(error);
//         res.json({ message: error});
//     }
// });

// // to display particular company
// router.get('/company/:companyName', async (req, res) => {
//     try {
//         const name = req.params.companyName;
//         const jobList = await JobDetail.find({compName: {$regex: '.*' + name, $options: 'i'}});
//         res.json(jobList);
//     } catch (error) {
//         console.log(error);
//         res.json({ message: error});
//     }
// });

// get both id and skill
router.get('/both/:skill/:loc', async (req,res) => {
    try {
        const skill = req.params.skill;
        const loc = req.params.loc;
        const jobList = await JobDetail.find({$and: [
            {location : {$regex: '.*' + loc, $options: 'i'}},
            {keyword : {$regex: '.*' + skill, $options: 'i'}}
        ]});
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// search by particular field
router.get('/:field/:key', async (req,res) => {
    try {
        const skill = req.params.key;
        const field = req.params.field;
        const jobList = await JobDetail.find({[field]: {$regex: '.*' + skill, $options: 'i'}});
        res.json(jobList);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

// to delete
router.delete('/:id', async (req,res) => {
    try {
        const removedJob = await JobDetail.findByIdAndDelete(req.params.id);
        res.json(removedJob);
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }
});

module.exports = router;