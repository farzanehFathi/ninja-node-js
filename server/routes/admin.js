const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

const adminLayout = "../views/layouts/admin";

//GET --- Admin - Login Page

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Dashboard",
      description: "simple dashboard for modifying blog posts",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

//POST --- Admin - Check Login

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (req.body.username === "admin" && req.body.password === "password") {
      res.send("you are logged in");
    } else {
      res.send("wrong username and password");
    }

    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
