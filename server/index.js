require('dotenv').config(); //allows access to environment variables
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const app = express(); 
const port = process.env.PORT | 8080; 

app.use(cors({origin: '*'})); //allow API from all access points
app.use(express.json()); //allow to send & recieve JSON formatted data

//MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => [
        console.log('MongoDB Connected'),
        //start server
        app.listen(port, () => {
            console.log('Port listening on PORT 8080...')
        })
 
    ])
    .catch((err) => {
        console.log(err, 'Connection failed')
    });

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Health Care Management System Server!')
})

