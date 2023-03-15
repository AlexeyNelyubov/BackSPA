const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');

const createToken = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signUpUser = async(req, res)=> {
    
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message)
    }
    
}

const signInUser = async(req, res)=> {
    const {email, password} = req.body;
    try {
        const user = await User.signin(email, password);

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message)
    }
}

module.exports = {signUpUser, signInUser}