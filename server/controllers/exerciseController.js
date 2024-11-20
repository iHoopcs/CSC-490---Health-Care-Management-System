const NINJAS_API_KEY = process.env.NINJAS_API_KEY;

const fetchExercises = async (exerciseType, req, res) => {
  let options = {
    method: 'GET',
    headers: { 'x-api-key': NINJAS_API_KEY }
  }

  let url = `https://api.api-ninjas.com/v1/exercises?type=${exerciseType}`

  return fetch(url, options)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(`error ${err}`)
      throw err;
    });
}


module.exports = {
  fetchExercises: fetchExercises
}
