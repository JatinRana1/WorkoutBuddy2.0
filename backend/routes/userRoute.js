const express = require('express');
const {loginUser, signUpUser} = require('../controller/userController')
const userRouter = express.Router();


//login route
userRouter.post('/login', loginUser)

//signup route
userRouter.post('/signup', signUpUser)

module.exports = userRouter;