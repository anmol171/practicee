const express = require("express");
const app = express();
var postCtrl = require('../controllers/postController');
var multer = require('multer');
var fs = require("fs");

module.exports = function (app) {

    app.post('/api/posts', postCtrl.addPost);
    app.use('/api/getPosts', postCtrl.findPost);
    app.delete('/api/deletePosts/:id', postCtrl.deletePost);
}