const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const { fetchExerciseData } = require('./controllers/exerciseController');

app.use(cors({ origin: '*' })); //allow API from all access points
app.use(express.json()); //allow to send & receive JSON formatted data
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api/exercises', exerciseRoutes)

//app.get('/api/exercise_data', fetchExerciseData);

module.exports = app;

