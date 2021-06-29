const express = require('express');
const mongoose = require("mongoose");
const config = require('config');
const path = require("path");
const app = express();

const PORT = config.get("port") || 5000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

app.use(express.json({ extended: true }));

app.use("/api", require("./routes/user.routes"))


if(process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, '../app', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../app', 'build', 'index.html'))
    })
}

const uri = config.get("uri");
const namedb = config.get("namedb");
const pathSrc = config.get("pathSrc");
 
async function connect() {
    try {
        console.log("Connecting database...")

        await mongoose.connect( `${uri}/${namedb}?authSource=${pathSrc}&ssl=false`, options);
 
        app.listen(PORT, () => console.log(`http://localhost:${PORT} server started`));
    } catch (e) {
        console.log("Server error: ", e.message)
        process.exit(1)
    }
}

connect();



