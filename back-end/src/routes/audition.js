let UserModel = require('../models/user.model')
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
var passport = require('passport')
var jwt = require('jsonwebtoken');
var config = require('../../config/database')

module.exports = function(app,passport){
    app.get('/', function(req,res){
        res.json('fuckoff');
    });


    app.post('/signup', function(req, res){
        var newUser = new UserModel({
         firstName: req.body.firstname,
            lastName : req.body.lastname,
            email: req.body.email,
            password: req.body.password
        })
        UserModel.createUser(newUser, function(err, user){
            if(err){
                res.json({success: false, message:'User is not registered..'})
            }

            else{
                res.json({success  :true, message : 'User is registered..'})
            }
            
        })
    })



app.post('/login', function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        UserModel.getUserByEmail(email, function(err, user){
            if(err){ throw err;}
            if(!user){
                return res.json({success: false, message: 'No user found'})}
         UserModel.comparePassword(password, user.password, function(err, isMatch){
                    if(err){throw err}
                    if(isMatch){
                        var token = jwt.sign({user}, config.secret, {expiresIn: 600000})

                        res.json({
                            success:true, token:'JWT '+token, user:{
                                id: user._id,
                                email: user.email,
                                firstname: user.firstName,
                                lastname: user.lastName,
                                password:user.password
                            }
                        })

                    }

                    else{
                        return res.json({success: false, message:'Password does not match'})
                    }
                })
            })




        })


        app.get('/profile', passport.authenticate('jwt', {session: false}), function(req,res){
           res.json({user : req.user});
        })

        app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');

        })

    }
