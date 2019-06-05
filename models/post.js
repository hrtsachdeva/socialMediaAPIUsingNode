const mongoose = require('mongoose');
//use to get id of some other obj , here user's id used in postedBy
const {ObjectId} = mongoose.Schema;


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
        
    },
    body:{
        type: String,
        required: true
       
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User"//name of the model used to create foreign key relation
    },
    created:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("Post",postSchema);