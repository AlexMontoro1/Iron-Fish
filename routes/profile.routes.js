const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");
const {
  passValidation,
  emailValidation,
} = require("../utils/verifications.js");
const { isLogged } = require("../middlewares/auth.middlewares.js");

const upload = multer({ dest: "temp/" });

// GET "/profile/main" => renderiza la vista principal del perfil

router.get("/main", isLogged, async (req, res, next) => {
  try {
    //console.log(req.session.activeUser);
    const userId = req.session.activeUser._id;
    //console.log(userId);
    const userParams = await User.findById(userId)
      .populate("wantedFish", "name")
      .populate("favFish", "name");

    const fishName = await Fish.find();
    //console.log(userParams);
    res.render("profile/main.hbs", {
      userParams,
      fishName,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/main", isLogged, async (req, res, next) => {
  try {
    const userId = req.session.activeUser._id;
    const fishToSave = req.body.favFish;

    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          favFish: fishToSave,
        },
      },
      { new: true }
    ); //console.log(favFish)
    res.redirect("back");
  } catch (err) {
    next(err);
  }
});

router.post("/:fishId/main", isLogged, async (req, res, next) => {
  try {
    const userId = req.session.activeUser._id;
    const fishId = await Fish.findById(req.params.fishId);
    //console.log(fishId.name);
    if (
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            wantedFish: fishId,
          },
        },
        { new: true }
      )
    ) {
      res.redirect("back");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/:fishId/delete", isLogged, async (req, res, next) => {
  try {
    const userId = req.session.activeUser._id;
    const fishId = req.params.fishId;
    //console.log(fishId.name);
    console.log(fishId);
   if( await User.findByIdAndUpdate(userId, {
      $pull: {
        wantedFish: fishId,
      },
    })) {
      res.redirect("back");
    }

    
  } catch (err) {
    next(err);
  }
});

router.get("/edit", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
  try {
    const userParams = await User.findById(userId);
    res.render("profile/edit.hbs", {
      userParams,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/edit", isLogged, async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!password) {
      return res.render("profile/edit.hbs", {
        errorMessage: "Porfavor, introduce una contraseña",
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
      const userId = req.session.activeUser._id;
      const userParams = await User.findById(userId);
      if (foundUsername !== null && foundUsername._id === userId) {
        res.render("profile/edit.hbs", {
          errorMessage: "El usuario ya existe, prueba con otro nombre",
        });
        return;
      }
      if (foundMail !== null && foundMail._id === userId) {
        res.render("profile/edit.hbs", {
          errorMessage:
            "El correo electronico ya existe, prueba con otro correo",
        });
        return;
      }
      const salt = await bcrypt.genSalt(12);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const editedUser = await User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          password: encryptedPassword,
        },
        { new: true }
      );

      //console.log(editedUser);
      //req.session.activeUser = editedUser;
      console.log("changed user !");
      res.redirect("/profile/main");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
