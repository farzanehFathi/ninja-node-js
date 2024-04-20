const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config().parsed;
const blogRoutes = require("./routes/blogRoutes");

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

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// blog Routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
