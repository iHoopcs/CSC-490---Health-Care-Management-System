const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const postSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    accountName: {
        type: String, 
        required: true
    },
    message: {
        type: String, 
        required: true,
    }    
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema); 
module.exports = Post; 