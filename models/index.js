const mongoose = require('mongoose');
mongoose.set("debug",true);


mongoose.connect("mongodb://localhost/launchpad",{keepAlive:true});

module.exports.FitnessPgm = require("./fitness.js");
module.exports.Exercise = require('./exercises.js')