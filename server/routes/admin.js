const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";

// GET
// ADMIN - Login Page

router.get("/admin", async (req, res) => {
  try {
    const locals = { title: "Admin Page", description: "create posts" };

    res.render("admin/index", { locals });
  } catch (err) {
    console.log(err);
  }
});

// POST
// ADMIN - Check login

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashPassword });
    res.status(201).json({ message: "user created", user });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "User already in use" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST
// ADMIN - Register

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (req.body.username === "admin" && req.body.password === "password") {
      res.send("You are logged in!");
    } else {
      res.send("Wrong username or password");
    }

    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
