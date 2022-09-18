const { json } = require("express");
const express = require("express");
const cors = require('cors')
const connectToMongo = require("./database")
connectToMongo();

const app = express();

app.use(cors())


app.use(express.json());

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(5000, function() {
    console.log("Server started on port 5000");
});
