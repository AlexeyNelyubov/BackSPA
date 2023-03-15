const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js')

const requireAuth= async(req, res, next)=> {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Authorazation token required"})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id')
        // req.user = await User.findOne({_id:'6410525eddfeb747af8e4972'}).select('_id')
        // req.user = await User.findById("6410525eddfeb747af8e4972").select('_id')
        
    } catch(error) {
        // console.log(error.message);
        console.log("Request is not authorized");
        return res.status(401).json({error: "Request is not authorized"})
    }
    next()
}

module.exports = {requireAuth}