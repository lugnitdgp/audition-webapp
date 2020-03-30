let UserModel = require('../models/user.model')
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
var passport = require('passport')
var jwt = require('jsonwebtoken');
var config = require('../../config/database')
let DashModel = require('../models/dash.model')

module.exports = function(app,passport){
    app.get('/', function(req,res){
        res.json('fuckoff');
    });

    app.post('/flag', (req,res)=>{
        console.log("backend" +req.body._id)
         const id = req.body._id
         UserModel.findByIdAndUpdate(id, {flag : true}, (err,user)=>{
             if(err) throw err;
             else{
                 return res.json('done')
             }
         })
         
    })
    app.post('/signup', function(req, res){
        var newUser = new UserModel({
            UserName: req.body.UserName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        })
        UserModel.createUser(newUser, function(err, user){
            if(err){
                res.json({success: false, message:'User is not registered..'})
            }

            else{
                
                if(user.isAdmin === false){
                    var user = new DashModel({
                        uid: user._id,
                        name: user.UserName
                    })

                    user.save()
                }


                res.json({success  :true, message : 'User is registered..'})
            }
            
        })
    })





app.post('/login', function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        console.log(email + ' '+password)
        UserModel.getUserByEmail(email, function(err, user){
            if(err){ throw err;}
            if(!user){
                return res.json({success: false, message: 'No user found'})}
         UserModel.comparePassword(password, user.password, function(err, isMatch){
                    if(err){throw err}
                    if(isMatch){
                        
                        const payload ={
                            id: user._id,
                            UserName : user.UserName,
                            email: user.email,
                            password:user.password,
                            isAdmin: user.isAdmin
                        }
                        var token = jwt.sign(payload, config.secret, {expiresIn: 600000})

                        res.json({
                            success:true, token:'Bearer '+token
                        })

                    }

                    else{
                        return res.json({success: false, message:'Password does not match'})
                    }
                })
            })




        })

       


        app.get('/auth/jwt', passport.authenticate('jwt', {session: false}), function(req,res){
            res.send(req.user)
        })

        app.get('/logout', function(req, res){
            req.logout();
            res.send('Logged out successfully')
            
        })

        app.get('/auth/google', passport.authenticate('google', {
            scope:['profile']
        }))

        // callback google

        app.get('/auth/google/redirect', passport.authenticate('google'),(req,res)=>{
                res.send(req.user)
        })



        app.get('/protected/getUsers',(req,res)=>{
                
                    DashModel.find().then(doc1=>{
                        return res.send(doc1)
    
                    })
            
                
                
            
        })

        app.post('/protected/getUser',(req,res)=>{
                console.log(req.body)
            DashModel.findOne({_id : req.body.id}).then(doc1=>{
                return res.json(doc1)

            })

    
    app.post('/protected/update', (req,res)=>{
        var a= req.body
        DashModel.replaceOne({_id:req.body._id}, a).then((doc)=>{
         console.log(doc)
        })

    })
        
    
})


        

    }
