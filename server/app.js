const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const routes = require('./routes/routes.js')

app.use(cors({origin: '*'})); //allow API from all access points
app.use(express.json()); //allow to send & receive JSON formatted data
app.use('/api', routes )

module.exports = app;  