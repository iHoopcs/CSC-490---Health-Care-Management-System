require('dotenv').config(); //give access to .env file variables
const bcrypt = require('bcrypt'); //library to hash passwords
const jwt = require('jsonwebtoken') //used for authorization - afte user authentication
const User = require('../Models/user.js'); 
const { validationResult } = require('express-validator'); //library for server-side data validation

const signup = async (req, res) => {
    const { 
        firstName, 
        lastName,
        height, 
        weight, 
        age, 
        password, 
        email,
        accountName
    } = req.body; 

    if (!firstName || !lastName || !height || !weight || !age || !password || !email || !accountName){
        res.status(404).json({
            errMsg: 'An error occured! - Missing data in request'
        })
    }

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
            email: email,
            accountName: accountName
        })

        //save user database
        newUser.save()
        res.status(201).json({
            msg: '*User Created*',
            user: newUser
        })
    }catch (err){
        res.status(400).send(err); 
    }
}

const login = async (req, res) => {
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

                        return res.status(201).json({
                            msg: 'Welcome '+ foundUser.firstName + '!', 
                            token: token,
                            userEmail: foundUser.email
                        })
                    }else {
                        return res.status(400).send('Error: incorrect password')   
                    }
                }else {
                    return res.status(400).send('Could not find account with inputted email')
                }
            })
    }
}

module.exports = {
    login, 
    signup
}