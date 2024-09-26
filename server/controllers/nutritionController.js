const oAuthGen = require('../utility/oAuthGen');

const searchFoods = async (req, res) => {
  const searchTerms = req.body.searchTerms;

  const foodSearch = {
    method: 'foods.search',
    search_expression: searchTerms,
    max_results: 5
  };

  let url = 'https://platform.fatsecret.com/rest/server.api';
  let httpMethod = 'POST';

  const result = new oAuthGen(httpMethod, url, foodSearch);

  console.log(result.signature);
  console.log('here');

  const response = await fetch(`${url}?${result.paramString}&oauth_signature=${result.signature}`, {
    method: 'POST'
  });

  const data = await response.json();
  console.log('fetch Data: ', data);

  return res.json(data);
}

module.exports = {
  searchFoods,
}
