const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));

//basic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
