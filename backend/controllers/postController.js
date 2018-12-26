var Post = require('../models/post');

module.exports = {
    addPost: function (req, res, next) {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        post.save();
        res.status(201).json({
            message: 'Post Added successfully'
        })
    },

    findPost: function (req, res, next) {
        Post.find()
            .then(documents => {
                // console.log(documents);
                res.status(200).json({
                    message: "post success",
                    posts: documents
                });

            });
    },

    deletePost: function (req, res, next) {
        Post.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Post Deleted" });
        });
    }


}