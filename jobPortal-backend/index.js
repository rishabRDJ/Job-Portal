// connect to db
require('./src/models/db');

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const jobController = require('./src/controllers/jobController');
const userController = require('./src/controllers/userController');

//middleware
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/job", jobController);
app.use("/api/user", userController);

app.listen(3200, () => {
    console.log('App server started at port : 3200');
});
