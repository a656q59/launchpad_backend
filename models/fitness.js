const mongoose = require("mongoose");
const Exercise = require('./exercises.js')

const fitnessSchema = new mongoose.Schema({
    programId:{
        type:Number,
        required:true,
        unique:true
    },
    programName:{
        type:String,
        required:true,
        unique:true
    },
    exercises:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Exercise'
    }]
})


fitnessSchema.post('findOneAndDelete',async function(program){
    if(program.exercises.length){
        const res = await Exercise.deleteMany({_id:{$in:program.exercises}});                                        //this will delete all exercises associated to a fitness program
    }                                                                                                               //from exercise collection when a fitness program is deleted
   
})


const FitnessPgm = mongoose.model("FitnessPgm", fitnessSchema);

module.exports = FitnessPgm;