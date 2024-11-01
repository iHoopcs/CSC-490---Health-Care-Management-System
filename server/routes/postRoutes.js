const express = require('express'); 
const router = express.Router(); 
const postController = require('../controllers/postController'); 

router.get('/posts', postController.fetchAllPosts)
router.post('/create-post', postController.createNewPost)
module.exports = router; 