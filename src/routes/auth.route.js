const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');

// /auth
authRouter.get('/login', authController.showLoginForm);
authRouter.post('/login', authController.login);
authRouter.get('/signup', authController.showSignupForm);
authRouter.post('/signup', authController.signup);
authRouter.get('/logout', authController.logout);

module.exports = authRouter;
