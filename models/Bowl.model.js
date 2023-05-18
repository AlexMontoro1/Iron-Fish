const mongoose = require("mongoose");

const bowlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false, // verificar en el server
    trim: true,
  },
  capacity: Number,
  water: {
    type: String,
    enum: [ "tropical", "salada", "fria" ]
  },
  isClosed: {
    type: String,
    enum: ["Si", "No"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bowl = mongoose.model("Bowl", bowlSchema);

module.exports = Bowl;
