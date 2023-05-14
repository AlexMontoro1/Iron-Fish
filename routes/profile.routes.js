const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");
const {
  passValidation,
  emailValidation,
} = require("../utils/verifications.js");

const { isLogged } = require("../middlewares/auth.middlewares.js");

// GET "/profile/main" => renderiza la vista principal del perfil

router.get("/main", isLogged, async (req, res, next) => {
  try {
    //console.log(req.session.activeUser);
    const userParams = await req.session.activeUser;
    const fishName = await Fish.find();
    console.log(userParams);
    res.render("profile/main.hbs", {
      userParams,
      fishName,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/edit", isLogged, (req, res, next) => {
  res.render("profile/edit.hbs");
});

router.post("/edit", isLogged, async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!password) {
      return res.render("profile/edit.hbs", {
        errorMessage: "Porfavor, intruduce una contraseña",
      });
    }
    const emailValid = await emailValidation(email);
    const passValid = await passValidation(password);
    // validacion de email
    if (emailValid.valid === false) {
      return res.render("profile/edit.hbs", {
        errorMessage: emailValid.errorMessage,
      });
      // validacion de password
    } else if (passValid.valid === false) {
      return res.render("profile/edit.hbs", {
        errorMessage: passValid.errorMessage,
      });
    } else {
        //! PREGUNTAR COMO VERIFICAR SI EL USUARIO ES EL MISMO DE LA CUENTA ACTIVA, QUE NO DE EL MENSAJE DE ERROR
      const foundUsername = await User.findOne({ username });
      const foundMail = await User.findOne({ email });
      if (foundUsername !== null) {
        res.render("profile/edit.hbs", {
          errorMessage: "El usuario ya existe, prueba con otro nombre",
        });
        return;
      } else if (foundMail !== null) {
        res.render("profile/edit.hbs", {
          errorMessage:
            "El correo electronico ya existe, prueba con otro correo",
        });
        return;
      }
      const editedUser = await User.findOneAndUpdate(
        req.session.activeUser,
        {
          username,
          email,
          password,
        },
        { new: true }
      );
      console.log(editedUser);
      req.session.activeUser = {
        username: editedUser.username,
        email: editedUser.email,
        password: editedUser.password,
      };
      console.log("changed user !");
      res.redirect("/profile/main");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
