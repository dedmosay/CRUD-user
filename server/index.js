const express = require('express');
const mongoose = require("mongoose");
const config = require('config');
const app = express();


const PORT = config.get("port");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

const uri = config.get("uri");
const namedb = config.get("namedb");
const path = config.get("path");

async function connect() {
    try {
        console.log("Connecting database...")
        await mongoose.connect( `${uri}/${namedb}?authSource=${path}&ssl=false`, options);
        app.listen(PORT, () => console.log(`http://localhost:${PORT} server started`));
    } catch (e) {
        console.log("Server error: ", e.message)
        process.exit(1)
    }
}

connect();

app.use(express.json({ extended: true }));

app.use("/api", require("./routes/user.routes"))

