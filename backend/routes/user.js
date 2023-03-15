const express = require('express');
const router = express.Router();

const {signUpUser, signInUser} = require('../controllers/usercontroller.js')

router.post('/signup', signUpUser);
router.post('/signin', signInUser);



module.exports = router;