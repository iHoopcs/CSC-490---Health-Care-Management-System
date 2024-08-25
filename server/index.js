const express = require('express'); 
const app = express(); 
const port = 8080; 

app.listen(port, () => {
    console.log('Port listening on PORT 8080...')
})
app.get('/', (req, res) => {
    res.send('Welcome to the Health Care Management System Server!')
})