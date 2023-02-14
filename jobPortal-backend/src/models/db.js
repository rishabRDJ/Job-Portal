const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// connection to local host
mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connecion Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./job.model');
