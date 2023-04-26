const mongoose = require('mongoose');
const FitnessPgm = require('./fitness');

const exerciseSchema = new mongoose.Schema({
    exerciseId:{
        type:Number,
        required:true,
    },
    exerciseName:{
        type:String,
        required:true,
    },
    exerciseLength:{
        type:Number,
        required:true
    },
    fitness:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FitnessPgm"
    }
})



const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;