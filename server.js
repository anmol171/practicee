// const app = require('./backend/index');
const express = require('express');
const app = express();
const http = require('http');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const morgan = require('morgan');
const request = require('request');

const mongoose = require("mongoose");

const cors_sec = require('./backend/routes/corsheaders');



mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/postDB', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("connection failed");
    });

const normalizeport = val => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};



const onError = error => {
    if (error.svscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " require elevated privileges");
            process.exit(1);
            break;

        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;

        default:
            throw error;
    }
};

app.use('/', cors_sec.CrossOriginHeaders);
app.set('trust proxy', 1) // trust first proxy
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(router);

require('./backend/routes/app')(router);

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    debug("Listening on " + bind);
};

const port = normalizeport(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error ", onError);
server.on("Listening", onListening);
server.listen(port);
