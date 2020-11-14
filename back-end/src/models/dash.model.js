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
    selected:{
         status : {type: Boolean, required: true, default: false},
          user: {type:String}
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
        status : {type: Boolean, required: true, default: false},
          user: {type:String}
    },
    answers:{
        type: Array,
        required:false
    }

});


var Details = module.exports = mongoose.model('Details', DashSchema);

