const Post = require('../models/Post');

const listPosts = (req,res,next) => {
    Post.find({ published: true })
    .then(posts => res.json({ posts }));
}

const addPost = (req,res,next) => {
    const newPost = new Post({
        ...req.body,
        author: req.user.id,
        slug: req.body.title.toLowerCase().split(" ").join("-")
    });
    newPost.save()
        .then(post => res.json(post))
        .catch(err => console.log(err));
}

const editPost = (req,res,next) => {
    Post.findOneAndUpdate(
        {"_id": req.params.id},{$set: req.body}
    )
    .then(post => res.json(post))
}

module.exports = {
    listPosts,
    addPost,
    editPost
}