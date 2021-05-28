const { Schema, model } = require("mongoose");

const user = new Schema({
    name: String,
    age: Number,
    company: String
});

module.exports = model("user", user);