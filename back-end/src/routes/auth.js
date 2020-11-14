let UserModel = require('../models/user.model')
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
var passport = require('passport')
var jwt = require('jsonwebtoken');
var config = require('../../config/database')
let DashModel = require('../models/dash.model')
let RoundModel = require('../models/round.model')

const { sendMail } = require('../reportSender');


module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.json('welcome');
    });

    app.post('/flag', (req, res) => {
        console.log("backend" + req.body._id)
        const id = req.body._id
        UserModel.findByIdAndUpdate(id, { flag: true }, (err, user) => {
            if (err) throw err;
            else {
                return res.json('done')
            }
        })

    })
    app.post('/signup', function (req, res) {
        var newUser = new UserModel({
            UserName: req.body.UserName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        })
        UserModel.createUser(newUser, function (err, user) {
            if (err) {
                res.json({ success: false, message: 'User is not registered..' })
            }

            else {

                if (user.isAdmin === false) {
                    var user = new DashModel({
                        uid: user._id,
                        name: user.UserName,
                        email: user.email
                    })

                    user.save()
                }


                res.json({ success: true, message: 'User is registered..' })
            }

        })
    })



    app.post('/addRound', function(req,res){
        console.log(req.body)
        var round = new RoundModel({
            roundNo: req.body.roundNo,
            questions: req.body.questions
        })

        round.save().then(()=>{
            res.json({success:true});
        });

    })

    app.get('/getRound', function(req,res){
        RoundModel.find().then((doc)=>{
            if(!doc){
               return res.json({success:false})
            }
            else{
                return res.send(doc)
            }
        })

    })

    app.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        console.log(email + ' ' + password)
        UserModel.getUserByEmail(email, function (err, user) {
            if (err) { throw err; }
            if (!user) {
                return res.json({ success: false, message: 'No user found' })
            }
            UserModel.comparePassword(password, user.password, function (err, isMatch) {
                if (err) { throw err }
                if (isMatch) {

                    const payload = {
                        id: user._id,
                        UserName: user.UserName,
                        email: user.email,
                        password: user.password,
                        isAdmin: user.isAdmin
                    }
                    var token = jwt.sign(payload, config.secret, { expiresIn: 600000 })

                    res.json({
                        success: true, token: 'Bearer ' + token
                    })

                }

                else {
                    return res.json({ success: false, message: 'Password does not match' })
                }
            })
        })




    })




    app.get('/auth/jwt', passport.authenticate('jwt', { session: false }), function (req, res) {
        res.send(req.user)
    })

    app.get('/logout', function (req, res) {
        req.logout();
        res.send('Logged out successfully')

    })

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }))


    app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
        res.send(req.user)
    })



    app.get('/protected/getUsers', (req, res) => {

        DashModel.find().then(doc1 => {
            return res.send(doc1)

        })
    })

    app.post('/protected/getUser', (req, res) => {
        console.log(req.body)
        DashModel.findOne({ _id: req.body.id }).then(doc1 => {
            return res.json(doc1)

        })

    })


    app.post('/protected/update', (req, res) => {
        var a = req.body
        DashModel.replaceOne({ _id: req.body._id }, a).then((doc) => {
            return res.json({ message: 'Changes have been saved' })
        })

    })


    app.post('/protected/purge', (req, res) => {
        var rejected = "";
        DashModel.find().then((doc) => {
            doc.forEach((user) => {
                if (user.selected.status === false && user.final.status === true) {
                     DashModel.findByIdAndDelete(user._id).then((err) => {
                         if (err) throw err
                        
                     })
                    rejected += user.email + ",";
                }
                else {
                    var userNew = user
                    userNew.selected = { status: false, user: '' },
                    userNew.final = { status: false, user: '' }
                    userNew.round = userNew.round + 1
                    DashModel.findByIdAndUpdate(user._id, userNew).then((res) => {
                        sendMail("Congratulations!", `Hi ${user.name}.\nWe are glad to inform you that you will be moving ahead in the audition process. Further details will be let known very soon.\nMay The Source Be With You!\n\nThanking You,\nYours' Sincerely,\nRohan Rao\n(Junior Member, GLUG)`, user.email)
                    })
                }

            })
        }).then(() => {
            const rejectedones = rejected.slice(0,-1)
            sendMail("Thank you for your participation.", "Hi there.\nWe announce with a heavy heart that you will not be moving ahead in the audition process. However, the GNU/Linux User's Group will always be there to help your every need to the best of our abilities.\nMay The Source Be With You!\n\nThanking You,\nYours' Sincerely,\nRohan Rao\n(Junior Member, GLUG)", rejectedones)
           
           }).then(() => {
            return res.send({ message: 'Purge completed' })
        })




    })




}
