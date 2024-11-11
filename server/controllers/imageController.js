const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const express = require('express');
const axios = require('axios');
const { createClient } = require('pexels');

const getImage = async (req, res) => {
  try {
    const imageName = req.body.name;
    console.log(String(PEXELS_API_KEY));

    let myPhotos;

    await fetch(`https://api.pexels.com/v1/search?query=${imageName}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    }).then(resp => {
      return resp.json()
    })
      .then(data => {
        getPhotos(data.photos);
        myPhotos = data.photos;
      })


    return res.json(myPhotos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch images' });
  }
}

function getPhotos(images) {
  images.map(image => {
    console.log(image)
  })
}


module.exports = {
  getImage: getImage,
}
