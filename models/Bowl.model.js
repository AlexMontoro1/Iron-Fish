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
  isClosed: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
