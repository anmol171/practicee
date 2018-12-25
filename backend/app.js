const express = require("express");
const bodyParser = require("body-parser");
// const debug = require("debug")("node-angular");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();



mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/backend', { useNewUrlParser: true })
.then(() => {
            console.log("Connected to database!");
        })
            .catch(() => {
                console.log("connection failed");
            });

// mongoose.connect("mongodb+srv://anmol:jXaF1EpRot2NXiTw@cluster0-2xtf9.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
//     .then(() => {
//         console.log("Connected to database!");
//     })
//         .catch(() => {
//             console.log("connection failed");
//         });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    // console.log(post);
    res.status(201).json({
        message: 'Post Added successfully'
    })
})

app.use('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            // console.log(documents);
            res.status(200).json({
                message: "post success",
                posts: documents
            });
    
        });
});

app.delete("/api/deletePosts/:id", (req, res, next) => {
    console.log(req.params.id,"sddddddddddddddddddddddddd");
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post Deleted" });
    });
});

module.exports = app;