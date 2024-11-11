const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(cors({ origin: '*' })); //allow API from all access points
app.use(express.json()); //allow to send & receive JSON formatted data

app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api/', postRoutes)
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workout', workoutRoutes);
app.use('/api/food', nutritionRoutes);
app.use('/api/image', imageRoutes);

module.exports = app;
