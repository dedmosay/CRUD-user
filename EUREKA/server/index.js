const express = require('express');
const mongoose = require("mongoose");
const config = require('config');
const app = express();


const PORT = config.get('port') || 8000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

const uri = config.get("uri");
const namedb = config.get("namedb");
const path = config.get("path");

async function connect() {
    try {
        await mongoose.connect( `${uri}/${namedb}?authSource=${path}`, options);
    } catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }
}

connect();

app.use(express.json({ extended: true }));

app.use("/api", require("./routes/user.routes"))

app.listen(PORT, () => console.log(`http://localhost:${PORT} server started`));