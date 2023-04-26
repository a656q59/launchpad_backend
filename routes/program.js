const express = require('express');
const router = express.Router()

const {viewAllPrograms, createProgram, viewProgram, editProgram, deleteProgram} = require('../handlers/program');

const {createExercise, deleteExercise} = require('../handlers/program');



router.get("/",viewAllPrograms);

router.post("/",createProgram);

router.get("/:id",viewProgram);

router.put("/:id",editProgram);

router.delete("/:id",deleteProgram);

router.post("/:id/exercises",createExercise);

router.delete("/:id/exercises/:exercise_id",deleteExercise);

module.exports = router;