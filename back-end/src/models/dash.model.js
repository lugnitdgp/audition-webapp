var mongoose = require('mongoose');
var Schema = mongoose.Schema;

questionstore = new Schema({
    qid:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    qtype:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:false
    },
    ansLink:{
        type: String,
        required:false
    }
})

const answerschema = new Schema({
    roundNo:{
        type:Number,
        required:true
    },
    questions:[questionstore],
  });

var DashSchema = new Schema({
    uid:{
        type: String,
        required: true,
        unique : true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    name:{
        type: String,
        required : true
    },
    status:{
        type: String,
        default: 'unevaluated',
        required: false
    },
    role:{
        type: String,
        required: false,
        default: 's'
    },
    round:{
        type:Number,
        required: true,
        default:1
    },
    time:{
        type:Number,
        required:true,
        default:0
    },
    feedback:{
        type: Array,
        required:false
    },
    lastUser:{
        type:String
    },
    answers:[answerschema],
    phone:{
        type: Number,
        required: false
    },
    roll:{
        type: String,
        required:false
    },
    profilebool:{
        type: Boolean,
        required:true,
        default:false
    }

});


var Details = module.exports = mongoose.model('Details', DashSchema);

