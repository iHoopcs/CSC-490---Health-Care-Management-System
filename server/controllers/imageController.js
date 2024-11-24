const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const express = require('express');
const axios = require('axios');
const { createClient } = require('pexels');

const getImage = async (req, res) => {
  try {
    const imageName = req.body.name;

    if (!imageName) {
      return res.status(400).json({ error: 'Image name is required' });
    }

    const response = await fetch(`https://api.pexels.com/v1/search?query=${imageName}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data = await response.json();
    getPhotos(data.photos);
    const myPhotos = data.photos;

    return res.json(myPhotos);
  } catch (error) {
    console.error(`Error fetching images: ${error.message}`);
    return res.status(500).json({ error: 'Unable to fetch images' });
  }
}

function getPhotos(images) {
  images.map(image => {
    console.log(image);
  });
}

function getPhotos(images) {
  images.map(image => {
    console.log(image)
  })
}


module.exports = {
  getImage: getImage,
}
