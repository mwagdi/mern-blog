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

module.exports = {
    listPosts,
    addPost
}