const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    height: {
        type: Number, 
        required: true
    },
    weight: {
        type: Number, 
        required: true
    },
    age: {
        type: Number, 
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema); 
module.exports = User; 