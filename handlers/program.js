const db = require('../models/index');




exports.viewAllPrograms = async function (req,res,next){
    try {
        const programs = await db.FitnessPgm.find({}).populate('exercises','-fitness');;  //TO VIEW ALL FITNESS PROGRAMS
        res.json(programs);
    } catch (error) {
        return next({
            status:400,
            message:error.message
        })
    }

}

exports.createProgram = async function (req,res,next){
    try {
    const pgm = await db.FitnessPgm.create(req.body);       // TO CREATE A FITNESS PROGRAM
    await pgm.save();
    res.json(pgm);
} catch (error) {
    if(error.code===11000){
        error.message="program already exists"
        return next({status:409,message:error.message})
    }
        return next({
            status:400,
            message:error.message
        })
    } 
}

exports.viewProgram = async function (req,res,next){
    try {
        const pgm = await db.FitnessPgm.findById(req.params.id).populate('exercises');    //TO VIEW INDIVIDUAL FITNESS PROGRAM WITH ALL EXERCISES
        res.json(pgm);
    } catch (error) {
        return next({
            status:400,
            message:'no such program exists'
        })
    }
}

exports.editProgram = async function(req,res,next){
    try {
        const {programId,programName} = req.body;        
        const pgm = await db.FitnessPgm.findById(req.params.id)
        if(!pgm) res.status(404).send('The course with give ID was not found ')    //TO EDIT A FITNESS PROGRAM (FITNESS PROGRAM ONLY)
        pgm.set({
            programId,
            programName
        })
        await pgm.save();
        res.json({pgm});
    } catch (error) {
        return next({
            status:400,
            message:error.message
        })        
    }
}

exports.deleteProgram = async function(req,res,next){
    try {
        const {programId} = await db.FitnessPgm.findByIdAndDelete(req.params.id);    
        if(programId!==null)
        res.status(200).send('deleted');                             //TO DELETE FITNESS PROGRAM
    } catch (error) {
        return next({
            status:400,
            message:error.message
        })   
    }    
    
}


exports.createExercise = async function(req,res,next){
    const {id}=req.params;
    try {
        const program = await db.FitnessPgm.findById(id);
        const {exerciseId, exerciseName, exerciseLength} = req.body;
        const exercise = await db.Exercise.create({exerciseId, exerciseName, exerciseLength})    //TO CREATE EXERCISES IN A FITNESS PROGRAM
        program.exercises.push(exercise);
        exercise.fitness = program;
        await program.save();
        await exercise.save();
        res.json({program});
    } catch (error) {
        return next({
            status:400,
            message:error.message
        })
    }
}

exports.deleteExercise = async function (req,res,next){
    try {
        const {id,exercise_id}=req.params;
        await db.Exercise.findByIdAndDelete(exercise_id);
        await db.FitnessPgm.updateOne({_id:id},{$pull:{exercises:exercise_id}}) // DELETE AN EXERCISE FROM FITNESS PROGRAM
        res.status(200).send('deleted');
    } catch (error) {
        return next({
            status:400,
            message:error.message
        })
    }
}