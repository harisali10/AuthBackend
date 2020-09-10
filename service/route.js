const express = require('express');
//ADD CONTROLLERS
const authController = require('../AuthModule/auth.controller');

// EXPRESS INSTANCE
const router = express.Router();


//Routes
router.post('/api/signUp',authController.registration);
router.post('/api/signIn',authController.login);
router.post('/api/usename',authController.getUserName);
