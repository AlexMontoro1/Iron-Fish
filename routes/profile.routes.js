const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");

const {isLogged} = require("../middlewares/auth.middlewares.js")

// GET "/profile/main" => renderiza la vista principal del perfil

router.get("/main", isLogged, (req, res, next) => {
    res.render("profile/main.hbs")
})




module.exports = router;
