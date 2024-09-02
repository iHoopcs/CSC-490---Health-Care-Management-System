const express = require('express'); 
const bcrypt = require('bcrypt'); //library to hash passwords
const router = express.Router(); 
const User = require('../models/user.js'); 

router.get('/users', async (req, res) => {
    try {
        const data = User.find();
        res.status(200).send(data)
    }catch (err) {
        res.status(500).send(err)
    }
})

router.post('/signup', async (req, res) => {
    const { 
        firstName, 
        lastName,
        height, 
        weight, 
        age, 
        username, 
        password, 
        email
    } = req.body; 

    try {
        const existingUser = await User.findOne({
            email: email
        })

        if (existingUser){
            //user already exists
            return res.status(400).send('User already exists')
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10); //hash 'password' with 10 'salt rounds'
        
        //create new User
        const newUser = User ({
            firstName: firstName, 
            lastName: lastName, 
            height: height, 
            weight: weight, 
            age: age, 
            username: username, 
            password: hashedPassword, 
            email: email
        })

        //save user database
        newUser.save()
        res.status(201).json({
            message: '*User Created*',
            user: newUser
        })
    }catch (err){
        res.status(400).send(err); 
    }
})

router.post('/login', (req, res) => {

})

module.exports = router; 
