const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const Blog = require("./models/blog");

const app = express();
let port = 3000;

//connect to MongoDB
const dbURI = `mongodb+srv://farzaneh:${env.password}@ninjanode.orhguy6.mongodb.net/ninja-node?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");

//middlware & static files
app.use(express.static("public"));

// app.use(morgan("dev"));

app.get("/single-blog", (req, res) => {
  Blog.findById("65fff412c0d4481029d3776e")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
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

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Post" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
