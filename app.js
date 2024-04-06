const express = require("express");
const morgan = require("morgan");

const app = express();

//register view engine
app.set("view engine", "ejs");

let port = 3000;
app.listen(port);

//middlware & static files
app.use(express.static("public"));

// app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogss = [];

  res.render("index", { title: "Home", blogss });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "New Post" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
