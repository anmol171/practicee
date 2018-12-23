const express = require("express");
const bodyParser = require("body-parser");
// const debug = require("debug")("node-angular");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://anmol:jXaF1EpRot2NXiTw@cluster0-2xtf9.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database!");
    })
        .catch(() => {
            console.log("connection failed");
        });

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
    console.log(post);
    res.status(201).json({
        message: 'Post Added successfully'
    })
})

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'dsdsdsds',
            title:'First server side post', 
            content: 'dsdsdssdssdvds'
        }
    ];
    res.status(200).json({
        message: "post success",
        posts: posts
    });
});

module.exports = app;