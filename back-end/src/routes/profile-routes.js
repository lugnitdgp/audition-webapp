const router = require('express').Router();
const User = require('../models/user.model')
const authCheck = (req,res,next)=>{

if(!req.params.id){
        res.redirect('/auth/login')
}else{
    next()
}

}
router.get('/:id', authCheck, (req,res)=>{
    User.getUserById(req.params.id, (err, user)=>{

        res.send("you are logged in, this is your profile - " + user.UserName)


    })
})



module.exports =router