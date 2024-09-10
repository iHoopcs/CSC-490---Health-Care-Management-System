const Exercise = require('../Models/exercise.js');
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
const NINJAS_API_KEY = process.env.NINJAS_API_KEY;
const axios = require('axios');

const fetchExercises = async (exercise, req, res) => {
  let options = {
    method: 'GET',
    headers: { 'x-api-key': NINJAS_API_KEY }
  }

  const muscle = 'biceps';
  let url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`

  fetch(url, options)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      return res.json(data);
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


module.exports = {
  fetchExercises: fetchExercises
}
