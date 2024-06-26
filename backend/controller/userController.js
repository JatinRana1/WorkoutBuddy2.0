const User = require('../model/userModel')
const jwt = require('jsonwebtoken');

//create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1h'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// signup user
const signUpUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
        console.error('failed to signup: ',error)
    }
}
 

module.exports = {
    loginUser,
    signUpUser,
}