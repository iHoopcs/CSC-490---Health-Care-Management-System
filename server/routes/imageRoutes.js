const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/find', (req, res) => {
  imageController.getImage(req, res);
});

module.exports = router;
