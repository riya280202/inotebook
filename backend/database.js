const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToDb = () => {
    mongoose.connect (mongoURI , function(){
        console.log("Connected to database");
    })
}

module.exports = connectToDb;