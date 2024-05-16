const express = require('express');
const controller = require('../controller/workoutController');
const requireAuth = require('../middleware/requireAuth');

const workoutRouter = express.Router();

//Require auth for all workout routes
workoutRouter.use(requireAuth)

//Get all workout
workoutRouter.get('/',controller.get_all_data)

//Get a single workout
workoutRouter.get('/:id',controller.get_single_data)

//Post a workout
workoutRouter.post('/', controller.post_workout)

//Delete a workout
workoutRouter.delete('/:id', controller.delete_workout)

//Update a workout
workoutRouter.patch('/:id', controller.update_workout)

module.exports = workoutRouter;