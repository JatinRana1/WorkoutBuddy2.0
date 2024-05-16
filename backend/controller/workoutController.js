const mongoose = require('mongoose')

//workout model import
const Workout = require('../model/workoutModel')

//Get all data
const get_all_data = async (req, res) =>{
    const user_id = req.user._id;
    try{    
        const allData = await Workout.find({user_id: user_id}).sort({createdAt: -1})
        res.status(200).json(allData)
    }catch(error){
        console.error('Error while fetching data: ', error);
        
    }
}

//Get a single workout
const get_single_data = async (req, res) =>{
    try{    
        const id = req.params.id;
        const single_data = await Workout.findById(id)
        res.status(200).json(single_data)
    }catch(error){
        console.error('Error while fetching data: ', error)
    }
}

//Post workout
const post_workout = async (req, res) =>{
    const {title, load, reps} = req.body;

    let emptyFields = []
    
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in the fields', emptyFields})
    }

    try{
        const user_id = req.user._id;
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    }catch(error){
        console.error('Error while posting data: ', error)
    }
}

//Delete a workout
const delete_workout = async (req, res) =>{
        const id = req.params.id
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'hele'})
          }
        const workout = await Workout.findOneAndDelete({_id: id})
        if(!workout) {
            return res.status(400).json({error: 'No such workout'})
          }

        res.status(200).json(workout)
    }catch(error){
        console.error('Error while fetching data: ', error)
    }
}

//Update a workout
const update_workout = async (req, res) =>{
    try{
        const { id } = req.param
        const updated_data = await Workout.findOneAndUpdate({id},{...req.body})
        res.status(200).json(updated_data)
    }catch(error){
        console.error('Error while fetching data: ', error)
    }
}

module.exports = {
    get_all_data,
    get_single_data,
    post_workout,
    delete_workout,
    update_workout
}