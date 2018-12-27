const express = require("express");
const app = express();
var postCtrl = require('../controllers/postController');
var multer = require('multer');
var fs = require("fs");
var userCtrl = require('../controllers/userController');




module.exports = function (app) {


    app.post("/api/user/signup", userCtrl.signUp);



    const MIME_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg'
    };

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const isValid = MIME_TYPE_MAP[file.mimetype];
            let error = new Error("Invalid mime type");
            if (isValid) {
                error = null;
            }
            cb(error, "backend/images");
        },
        filename: (req, file, cb) => {
            const name = file.originalname.toLowerCase().split(' ').join('-');
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name + '-' + Date.now() + '.' + ext);

        }
    });

    app.post('/api/posts', multer({ storage: storage }).single("image"), postCtrl.addPost);
    app.use('/api/getPosts', postCtrl.getPost);
    app.delete('/api/deletePosts/:id', postCtrl.deletePost);
    app.put('/api/updatePost/:id', multer({ storage: storage }).single("image"), postCtrl.updatePosts);
    app.get('/api/findPost/:id', postCtrl.findPost);
}