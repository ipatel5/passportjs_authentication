const express = require('express');
const User = require('../models/authModel');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const router = express.Router();

router.post(
    '/signup',
    authController.signup
);

router.post('/login',
    function (req, res) {
        passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info,
                    user: user
                });
            }
            req.login(user, {
                session: false
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                // console.log(user)
                const token = jwt.sign({
                    userid: user.id,
                    email: user.email,
                    role_id: user.role_id
                },
                    'jwt_secret', {
                        expiresIn: '2h'
                    }
                );
                // const token = jwt.sign(JSON.stringify(user), 'jwt_secret');
                res.send({
                    token
                });
            });
        })(req, res);
    });

module.exports = router;