require('dotenv').config(); //give access to .env file variables
const express = require('express'); 
const bcrypt = require('bcrypt'); //library to hash passwords
const jwt = require('jsonwebtoken') //used for authorization - afte user authentication
const { check, validationResult } = require('express-validator'); //library for server-side data validation
const router = express.Router(); 
const User = require('../models/user.js'); 

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

router.post('/login', [check('email').isEmail().notEmpty().withMessage('Error: Check inputted email'), check('password').isLength({min: 5, max: 20}).withMessage('Password length: min: 5 characters & max: 15 characters')], (req, res) => {
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
                        
                        //generate JWT 
                       const token = jwt.sign(
                        {userId: foundUser.id, userFirstName: foundUser.firstName, userEmail: foundUser.email},
                        process.env.SECRET_KEY, 
                        {expiresIn: '1h'}
                        )   

                        return res.status(200).json({
                            msg: 'Welcome '+ foundUser.firstName + '!', 
                            token: token
                        })
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
