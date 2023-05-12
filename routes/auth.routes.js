// requerimientos
const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");

// Rutas de user
// Ruta get para renderizar la pagina de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});
// Ruta para verificar los datos y crear nuevos usuarios
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  //Validacion del correo
  const regexEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
  if (regexEmail.test(email) === false) {
    res.render("auth/signup.hbs", {
      errorMessage: "Porfavor, intruduce un correo electrónico válido",
    });
    return;
  }

  //Validacion de contraseña
  const regexPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (regexPass.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "La contraseña debe de contener al menos 8 carácteres, al menos 1 mayúscula, 1 minúscula y 1 número. Puede contener carácteres especiales",
    });
    return;
  }
  try {
    // Comprobacion de si existen los mismos usuarios o mails ya registrados
    const foundUsername = await User.findOne({ username });
    const foundMail = await User.findOne({ email });
    if (foundUsername !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "El usuario ya existe, prueba con otro nombre",
      });
      return;
    } else if (foundMail !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "El correo electronico ya existe, prueba con otro correo",
      });
      return;
    }
    // Encriptacion de contraseña
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);
    //console.log(encryptedPassword);
    await User.create({
        username,
        email,
        password: encryptedPassword,
      });
      console.log("Created User !");
      res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});
// Ruta para renderizar la pagina de login
router.get("/login", (req,res,next)=> {
    res.render("auth/login.hbs")
});
// Ruta para verificar que lo datos de acceso sean correcto y esten en la BD
router.post("/login", async (req,res,next) => {
    //console.log(req.body);
    const { email, password } = req.body;
    if (email === "" && password === "") {
        res.render("auth/login.hbs", {
          errorMessage: "El correo electronico y la contraseña son obligatorios para acceder.",
        });
        return;
      } else if (email === "") {
        res.render("auth/login.hbs", {
          errorMessage: "El correo electrónico es obligatorio para acceder.",
        });
        return;
      } else if (password === "") {
        res.render("auth/login.hbs", {
          errorMessage: "La contraseña es obligatoria para acceder.",
        });
        return;
      }
    try {
        const foundUser = await User.findOne({ email })
        if( foundUser === null){
            res.render("auth/login.hbs", {
                errorMessage: "Este correo electrónico no esta asociado a ningun usuario",
              });
              return;
        }
        const correctPassword = await bcrypt.compare(password, foundUser.password);
        //console.log(correctPassword);
        if( correctPassword === false){
            res.render("auth/login.hbs", {
                errorMessage: "La contraseña no es correcta",
              });
              return;
        }
        req.session.activeUser = foundUser;
        req.session.save(() => {
          res.redirect("/profile/main");
    });        
    } catch (err) {
        next(err)
    }
})

module.exports = router;
