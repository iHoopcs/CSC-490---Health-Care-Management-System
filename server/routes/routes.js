const express = require('express'); 
const bcrypt = require('bcrypt'); //library to hash passwords
const { check, validationResult } = require('express-validator'); //library for server-side data validation
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

router.post('/login', [check('email').isEmail().notEmpty().withMessage('Error: Check inputted email'), check('password').isLength({min: 5, max: 15}).withMessage('Password length: min: 5 characters & max: 15 characters')], (req, res) => {
    const { email, password } = req.body; 
    const errors = validationResult(req); //holds errors for user input validation

    //user input validation
    if (!errors.isEmpty()){ //if there are errors
        return res.status(400).json({error: errors.array()})
    }else {
        
        //find User with email
        User.findOne({
            email: email
        })
            .then(async (foundUser) => {
                if (foundUser){ //user exists w/ email
                    //verify password
                    console.log(foundUser)
                    const match = await bcrypt.compare(password, foundUser.password)

                    if (match) {//hash input password = db account hash password
                        //generate JWT & send to user

                        return res.status(200).send('Welcome ' + foundUser.firstName + '!')
                    }else {
                        return res.status(400).send('Error: incorrect password')   
                    }
                }else {
                    return res.status(400).send('Could not find account with inputted email')
                }
            })
    }
})

module.exports = router; 
