//dotenv
require('dotenv').config();

const express = require('express');

//cors
const cors = require('cors');

//route import
const workoutRoutes = require('./routes/workoutRoute');
const userRoutes = require('./routes/userRoute');

//express app
const app = express()

//middleware
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/workouts',workoutRoutes)

//connecting database with mongoose
const mongoose = require('mongoose');
const connectServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to the server');
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('Listning on port no: ', process.env.PORT)
        })  
    }catch(error){
        console.error('Failed to connect with mongodb: ', error)
    }
}
connectServer();