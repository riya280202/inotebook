const express = require("express");
const connectToMongo = require("./database")
connectToMongo();

const app = express();

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});