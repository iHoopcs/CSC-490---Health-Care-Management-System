const express = require('express'); 
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

router.post('/register-user', (req, res) => {
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

    //check if user with email already exists
    User.find({
        email: email
    }).then((foundUser) => {
        if (!foundUser.length == 1){ //if no users found - create new
            const newUser = User({
                firstName: firstName, 
                lastName: lastName,
                height: height, 
                weight: weight, 
                age: age, 
                username: username, 
                password: password, 
                email: email,
            }); 
        
            /*
            newUser.save()
                .then((response) => {
                    response.send('*user created*')
                })
                .catch(err => console.log(err))
            */
            res.status(201).send('*user created*')
            
        }else {
            res.status(400).send('Email already registered to an account')
        }
        
    })
})

module.exports = router; 
