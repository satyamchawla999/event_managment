const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(`${process.env.H}://${process.env.U}:${process.env.P}${process.env.R}/${process.env.L}`);

const db = mongoose.connection;

db.on("error",console.error.bind(console,'Error Connection To MongoDB'));

db.once('open',function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;