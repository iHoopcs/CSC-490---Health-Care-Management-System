const Post = require('../Models/post.js'); 

const fetchAllPosts =  async (req, res) => {
    try {
        await Post.find()
            .then((data) => {
                res.status(200).json({
                    posts: data
                })
            })
            .catch((err) => {
                res.status(400).json({
                    errMsg: 'An error occured', 
                    error: err
                })
            })
    }catch (err) {
        console.log(err)
    }
}

const createNewPost = async (req, res) => {
    const {
        firstName, 
        lastName, 
        accountName, 
        message
    } = req.body

    console.log(req.body)

    //create new post
    const newPost = Post({
        firstName: firstName, 
        lastName: lastName, 
        accountName: accountName, 
        message: message
    })

    //save post to db
    await newPost.save(); 

    res.status(201).json({
        msg: 'Post created!'
    })
}  

module.exports = {
    fetchAllPosts,
    createNewPost
}