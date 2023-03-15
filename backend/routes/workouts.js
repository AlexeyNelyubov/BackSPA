const express = require('express');
const Workout = require('../models/WorkoutModel')
const {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout} =require ('../controllers/workoutcontroller')
const {requireAuth} = require('../middleware/requireAuth.js')
const router = express.Router();


router.use(requireAuth);
//GET all workouts
router.get('/', getWorkouts);

//GET single workout
router.get('/:id', getWorkout);

//POST a new workout 
router.post('/', createWorkout);

//DELETE a workout 
router.delete('/:id', deleteWorkout);

//UPDATE a new workout 
router.patch('/:id', updateWorkout);

module.exports = router;
