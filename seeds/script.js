const Fish = require("../models/Fish.model.js");
const mongoose = require("mongoose")
require("../db/index.js")
const allFish = require("./fish.json")
Fish.insertMany(allFish)
.then(()=> {
    console.log("peces metidos en la bd");
    mongoose.connection.close()
})
.catch((err)=> {
    console.log(err);
})