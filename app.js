const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const Blog = require("./models/blog");

// create express app
const app = express();

// register view engine
app.set("view engine", "ejs");
app.use(express.static("./public"));

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
  res.render("index", { title: "Home" });
  // res.sendFile("./views/index.html", root:{__dirname})
});

app.get("/blogs", (req, res) => {});

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "This is just a new blog",
    snippet: "I'm testing myself",
    body: "I hope to scuced",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
