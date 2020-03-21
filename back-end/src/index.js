let express = require('express')
let app = express()
var mongoose = require('mongoose')
let path = require('path')
let bodyParser = require('body-parser')
let EventRoute = require('./routes/audition')
var morgan = require('morgan')
let cors = require('cors')
var passport = require('passport')
var config = require('../config/database')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
require('./routes/audition')(app, passport)

app.use((req,res,next) =>{
    console.log(`${new Date().toString()} =>${req.originalUrl}` , req.body)
    
    next()
})

app.use(EventRoute)

app.use(express.static('public'))
//Handler for 404
app.use((req, res, next) => {
    res.status(404).send("We think you're lost")
})

//Handler for 500
app.use((err, req, res, next) => {
    console.error(err.stack)
   res.sendFile(path.join(__dirname,'../public/500.html'))
})


mongoose.connect(config.db , {
    useMongoClient : true
})

mongoose.Promise = global.Promise;

require('../config/passport')(passport)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>console.log(`SERVER started on port ${PORT}`))

