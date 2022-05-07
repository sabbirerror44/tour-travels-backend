const express = require('express');
const { signup, login } = require('../Controller/adminController');
const router = express.Router();


// admin sign up
router.post('/signup', signup)

// Admin log in without access_token
router.post('/login', login)

module.exports = router;

