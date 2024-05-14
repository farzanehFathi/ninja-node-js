const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

// Check Login

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

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

    const user = await User.findOne({ username });

    if (!User) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpONly: true });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

// GET --- Admin - Dashboard

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Manage content and blogs",
    };

    const data = await Post.find().sort({ CreatedAt: -1 });

    res.render("admin/dashboard", { locals, data, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// GET --- Admin - Create a New Post
router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Create a Blog Post with NodeJs, Express & MongoDb",
    };
    const data = await Post.find();
    res.render("admin/add-post", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// POST --- Admin - Create a New Post
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
      });

      await Post.create(newPost);
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

// GET --- Admin - Updated a Post
router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Edit Post",
      description: "Edit a Blog Post with NodeJs, Express & MongoDb",
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit-post", { locals, data, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// PUT --- Admin - Updated a Post
router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      UpdatedAt: Date.now(),
    });
    res.redirect(`/edit-post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Delete --- Admin - Delete a Post
router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

//POST --- Admin - Register

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
