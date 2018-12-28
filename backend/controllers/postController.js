var Post = require('../models/post');

module.exports = {
    addPost: function (req, res, next) {
        const url = req.protocol + '://' + req.get("host");
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file.filename,
            creator: req.userData.userId
        });
        post.save().then(createdPost => {
            res.status(201).json({
                message: 'Post Added successfully',
                post: {
                    ...createdPost,
                    id: createdPost._id,
                    // title: createdPost.title,
                    // content: createdPost.content,
                    // imagePath: createdPost.imagePath

                }
            });
        });
    },

    getPost: function (req, res, next) {
        console.log(req.query);
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const postQuery = Post.find();
        let fetchedPosts;
        if (pageSize && currentPage) {
            postQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        }
        postQuery.then(documents => {
            // console.log(documents);
            // res.status(200).json({
            //     message: "post success",
            //     posts: documents
            // });
            fetchedPosts = documents;
            return Post.count();
        }).then(count => {
            res.status(200).json({
                message: "post fetched successfully",
                posts: fetchedPosts,
                maxPosts: count
            });
        });
    },
    updatePosts: function (req, res, next) {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + '://' + req.get("host");
            imagePath: url + "/images/" + req.file.filename
        }

        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId
        })
        Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: "Update Successfull" });
            } else {
                res.status(401).json({ message: "Not Authorized" });
            }
        })
    },

    findPost: function (req, res, next) {
        Post.findById(req.params.id).then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found!" });
            }
        });
    },

    deletePost: function (req, res, next) {
        Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion Successfull" });
            } else {
                res.status(401).json({ message: "Not Authorized" });
            }
        });
    }


}