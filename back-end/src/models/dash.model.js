var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var DashSchema = new Schema({
    uid:{
        type: String,
        required: true,
        unique : true
    },
    selected:{
        type: Array,
        required: true,
        default: { selected : false, user:''}
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
    final:{
        type: Boolean,
        required:true,
        default: false
    }

});


var Details = module.exports = mongoose.model('Details', DashSchema);

