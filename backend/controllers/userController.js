var express = require("express");
var User = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
    signUp: function (req, res, next) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                var user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "user Created",
                            result: result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            })

    },

    login: function (req, res, next) {
        let fetchedUser;
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "User not exists"
                    })
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: "User result not exists"
                    })
                }
                var token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_this_should_be_longer", 
                {
                    expiresIn: "1h"
                });
                res.status(200).json({
                    token:token,
                    expiresIn: 3600
                });
            })
            .catch(err => {
                return res.status(401).json({
                    message: "User Catch not exists"
                })
            });
    }
}