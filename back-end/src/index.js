let express = require('express')
let app = express()
var mongoose = require('mongoose')
let path = require('path')
let bodyParser = require('body-parser')
let AuthRoute = require('./routes/auth')
let helmet= require('helmet')
let xss= require('xss-clean')
var morgan = require('morgan')
let cors = require('cors')
var passport = require('passport')
var config = require('../config/database')
const cookieSession = require('cookie-session');
const mongoSanitize = require('express-mongo-sanitize');


app.use(mongoSanitize())
app.use(xss())
app.use(express.json({ limit: '4kb' }))
app.use(cors())
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ["rohan"]
}))
require('./routes/auth')(app, passport)

app.use((req,res,next) =>{
    console.log(`${new Date().toString()} =>${req.originalUrl}` , req.body)
    
    next()
})

app.use(AuthRoute)
app.use(express.static('public'))
//Handler for 404
app.use((req, res, next) => {
    res.status(404).send("We think you're lost")
})

//Handler for 500
app.use((err, req, res, next) => {
    console.log(err.stack)
   res.sendFile(path.join(__dirname,'../public/500.html'))
})


mongoose.connect(config.db ,{ useUnifiedTopology: true, useNewUrlParser: true },
)

mongoose.Promise = global.Promise;

require('../config/passport')(passport)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>console.log(`SERVER started on port ${PORT} ` ))

