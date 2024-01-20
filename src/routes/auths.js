const express = require('express');
const { register, login } = require('../controllers/auths');
const router = express.Router();

// Define the routes here
router.post('/register', register)
router.post('/login', login)

module.exports = router;