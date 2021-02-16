var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventLogSchema = new Schema({
    user: {
        type: String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    message: {
        type:String,
        required:true,
    },
    
});

var Events = module.exports = mongoose.model('EventLog', EventLogSchema);