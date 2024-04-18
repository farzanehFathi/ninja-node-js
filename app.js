const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const Blog = require("./models/blog");

// create express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// middlware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

// connect to mongoDB
const dbURI = `mongodb+srv://farzaneh:${env.password}@ninjanode.orhguy6.mongodb.net/ninjaNode?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// listen for requests

app.get("/", (req, res) => {
  res.redirect("/blogs");
  // res.sendFile("./views/index.html", root:{__dirname})
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
