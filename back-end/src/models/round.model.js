var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const quesSchema = new Schema({
    quesNo:{
        type:Number,
        required: true,

    },
    quesText:{
        type:String,
        required:true
    },
    quesLink:{
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
    questions: [quesSchema],
    
});


var Details = module.exports = mongoose.model('Rounds', RoundSchema);