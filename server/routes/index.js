import express from 'express';
import passport from './../config/passport';
import {
    register,
    login,
    facebook,
    google,
    forgotPassword,
    verifyToken
    } from '../controllers/authentication';
import {
    getPolls,
    getMyPolls
    } from '../controllers/polling';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const localRegister = passport.authenticate('register', { session: false });
const localLogin = passport.authenticate('login', { session: false });
const facebookLogin = passport.authenticate('facebook', { scope : 'email', session: false });
const facebookLoginCb = passport.authenticate('facebook', { session: false });
//const twitterLogin = passport.authenticate('twitter', { session: false });
const googleLogin = passport.authenticate('google', { scope : ['profile', 'email'], session: false });
const googleLoginCb = passport.authenticate('google', { session: false });

// use session for passport
//var session = require('express-session');
//app.use(session({
//	secret: 'mks-voting-app',
//	resave: false,
//	saveUninitialized: true
//}));
//app.use(passport.initialize());
//app.use(passport.session());
//function isLoggedIn (req, res, next) {
//    if (req.isAuthenticated()) {
//        return next();
//    } else {
//        res.redirect('/login');
//    }
//}

module.exports = (app) => {
    // Initializing route groups
    const apiRoutes = express.Router();
    const authRoutes = express.Router();

    // Set url for API group routes
    app.use('/api', apiRoutes);

    //=========================
    // Auth Routes
    //=========================
    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // POST /api/auth/register
    authRoutes.post('/register', localRegister, register);
    // POST /api/auth/login
    //authRoutes.post('/login', localLogin);
    authRoutes.post('/login', localLogin, login);
    // POST /api/auth/forgot-password
    // Password reset request route (generate/send token)
    authRoutes.post('/forgot-password', forgotPassword);
    // POST /api/auth//reset-password/:token
    // Password reset route (change password using token)
    authRoutes.post('/reset-password/:token', verifyToken);

    // GET /api/auth/facebook
    authRoutes.get('/facebook', facebookLogin);
    authRoutes.get('/facebook/callback', facebookLoginCb, facebook);
    //authRoutes.get('/twitter', twitterLogin);
    //authRoutes.get('/twitter/callback', twitterLogin, authController.twitter);
    authRoutes.get('/google', googleLogin);
    authRoutes.get('/google/callback', googleLoginCb, google);

    //=========================
    // User Routes
    //=========================

    // Test protected route
    apiRoutes.get('/protected', requireAuth, (req, res) => {
        res.send({ content: 'The protected test route is functional!' });
    });

    //=========================
    // Poll Routes
    //=========================

    apiRoutes.get('/polls', getPolls);

    apiRoutes.get('/users/:userId/polls', requireAuth, getMyPolls);

    apiRoutes.get('/polls/:pollId', (req, res) => {
        let pollId = req.params.pollId;
        res.send({ content: 'Get specific poll' });
    });

    apiRoutes.post('/polls/:pollId/options/:optionId/vote', (req, res) => {
        let pollId = req.params.pollId;
        let optionId = req.params.optionId;
        res.send({ content: 'Submit a vote' });
    });

    apiRoutes.post('/polls', (req, res) => {
        res.send({ content: 'Add a poll' });
    });

    apiRoutes.delete(`/polls/:pollId`, (req, res) => {
        let pollId = req.params.pollId;
        res.send({ content: 'Delete a poll' });
    });

    apiRoutes.post('/options', (req, res) => {
        res.send({ content: 'Add an option' });
    });
};
