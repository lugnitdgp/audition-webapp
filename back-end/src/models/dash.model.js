var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
    round:{
        type:Number,
        required: true,
        default:1
    },
    feedback:{
        type: Array,
        required:false
    },
    lastUser:{
        type:String
    },
    answers:{
        type: Array,
        required:false
    }

});


var Details = module.exports = mongoose.model('Details', DashSchema);

