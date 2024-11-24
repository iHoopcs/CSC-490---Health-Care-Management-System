require('dotenv').config(); //allows access to environment variables
const mongoose = require('mongoose');
const app = require('./app.js');
const port = process.env.PORT | 8080;

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

export default app; 
