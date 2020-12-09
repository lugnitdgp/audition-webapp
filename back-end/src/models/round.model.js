var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const quesSchema = new Schema({
    quesText:{
        type:String,
        required:true
    },
    quesLink:{
        type:String,
        required:false
    },
    quesType:{
        type:String,
        required:true
    },
    options:{
        type:String,
        required:false
    }
  });

var RoundSchema = new Schema({
    roundNo: {
        type: Number,
        required:true,
        unique:true
    },
    time:{
        type:Number,
        required:true,
    },
    questions: [quesSchema],
    
});


var Details = module.exports = mongoose.model('Rounds', RoundSchema);