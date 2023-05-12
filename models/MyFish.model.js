const mongoose = require("mongoose");

const myFishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false, // realizar verificacion en el server
        trim: true
    },
    age: {
        type: Number,
        required: false,
        unique: false
    },
    fish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fish"
    },
    bowl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bowl"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
})

const MyFish = mongoose.model("MyFish", myFishSchema);

module.exports = MyFish;
