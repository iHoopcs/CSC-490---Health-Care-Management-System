const User = require('../Models/user.js');
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY; 

const fetchUserData = (req, res) => {
    //parse out JWT token
    const authHeader = req.headers.authorization; 
    const splitData = authHeader.split(' ')
    const token = splitData[1]
    const userEmail = splitData[2]
    if (token === null) return res.status(403).json({msg: 'Error: no token provided'})
    
    //verify JWT 
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({msg: 'Invalid token'})

        console.log(decoded)

        await User.findOne({
            email: userEmail
        })
            .then((foundUser) => {
                res.status(200).json({
                    code: decoded, 
                    user: foundUser
                })
            })
            .catch(err => console.log(err))
    })
}

module.exports = {
    fetchUserData
}