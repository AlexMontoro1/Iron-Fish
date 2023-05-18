const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema({
    
    name: String,
    description: String,
    type: String,
    lifeExp: String,
    aggr: Number,
    url: String

})

const Fish = mongoose.model("Fish", fishSchema);

module.exports = Fish;