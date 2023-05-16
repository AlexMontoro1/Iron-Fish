const express = require('express');
const router = express.Router();

const {isOnline} = require("../middlewares/auth.middlewares.js")
router.use(isOnline);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const profileRouter = require("./profile.routes.js")
router.use("/profile", profileRouter)

const searchRouter = require("./search.routes.js")
router.use("/search", searchRouter)

const bowlRouter = require("./bowl.routes.js")
router.use("/bowl", bowlRouter)

const myfishRouter = require("./myfish.routes.js")
router.use("/myfish", myfishRouter)


module.exports = router;