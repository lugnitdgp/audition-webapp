let express = require('express')
let app = express()
var mongoose = require('mongoose')
let path = require('path')
let bodyParser = require('body-parser')
let Routes = require('./routes/index')
let helmet = require('helmet')
let xss = require('xss-clean')
var morgan = require('morgan')
let cors = require('cors')
var passport = require('passport')
const cookieSession = require('cookie-session');
//const mongoSanitize = require('express-mongo-sanitize');


require('dotenv').config()

//app.use(mongoSanitize())
app.use(xss())
app.use(express.json({ limit: '100kb' }))
app.use(cors())
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["rohan"]
}))
require('./routes/index')(app, passport)
app.use(Routes)

app.use((req, res, next) => {
    console.log(`${new Date().toString()} =>${req.originalUrl}`, req.body)

    next()
})

app.use(express.static('public'))
//Handler for 404
app.use((req, res, next) => {
    res.status(404).send("We think you're lost")
})

//Handler for 500
app.use((err, req, res, next) => {
    console.log(err)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true, //this is the code I added that solved it all
},
)

mongoose.Promise = global.Promise;


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`SERVER started on port ${PORT} `))