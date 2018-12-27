const mongoose = require('mongoose');
// const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    eamil: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);