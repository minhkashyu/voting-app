import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from './../models/user';
import config from './../config/main';

import { setLocalUserInfo, setFacebookInfo, setTwitterInfo, setGoogleInfo, getRole } from '../helpers';

const generateToken = user => {
    return jwt.sign(user, config.secret, {
        expiresIn: 10800 // 3 hrs
    });
};

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

export function register(req, res, next) {
    const userInfo = setLocalUserInfo(req.user);

    res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

export function login(req, res, next) {
    const userInfo = setLocalUserInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

export function facebook(req, res, next) {
    const userInfo = setFacebookInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

export function twitter(req, res, next) {
    const userInfo = setTwitterInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

export function google(req, res, next) {
    const userInfo = setGoogleInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
}

//= =======================================
// Authorization Middleware
//= =======================================

export function roleAuthorization(requiredRole) {
    return function (req, res, next) {
        const user = req.user;

        User.findById(user._id, (err, foundUser) => {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            if (getRole(foundUser.role) >= getRole(requiredRole)) {
                return next();
            }

            return res.status(401).json({ error: 'You are not authorized to view this content.' });
        });
    };
}

//= =======================================
// Forgot Password Route
//= =======================================

export function forgotPassword(req, res, next) {
    const email = req.body.email;

    User.findOne({ 'local.email': email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        if (!existingUser) {
            return res.status(422).json({ error: 'Your email can not be processed. Please try again.'});
        }

        // If user is found, generate and save resetToken
        // Generate a token with Crypto
        crypto.randomBytes(48, (err, buffer) => {
            if (err) {
                return next(err);
            }

            const resetToken = buffer.toString('hex');
            existingUser.local.resetPasswordToken = resetToken;
            existingUser.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            existingUser.save(err => {
                if (err) {
                    return next(err);
                }

                const message = {
                    subject: 'Reset Password',
                    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };
                // TODO: add email service

                return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
            });
        });
    });
}

//= =======================================
// Reset Password Route
//= =======================================

export function verifyToken(req, res, next) {
    User.findOne({
            'local.resetPasswordToken': req.params.token,
            'local.resetPasswordExpires': { $gt: Date.now() }
        }, (err, resetUser) => {
            if (err) {
                return next(err);
            }

            if (!resetUser) {
                res.status(422).json({ error: 'Your token has expired. Please reset your password again.' });
            }

            resetUser.local.password = req.body.password;
            resetUser.local.resetPasswordToken = undefined;
            resetUser.local.resetPasswordExpires = undefined;

            resetUser.save(err => {
                if (err) {
                    return next(err);
                }

                const message = {
                    subject: 'Password Changed',
                    text: 'You are receiving this email because you changed your password. \n\n' +
                    'If you did not request this change, please contact us immediately.'
                };
                // TODO: add email service

                return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
            });
        }
    );
}