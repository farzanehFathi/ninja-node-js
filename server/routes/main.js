const express = require("express");
const router = express.Router();

//Routes
router.get("", (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    descirption: "Simple blog crated with NodeJs, Express & MongoDb",
  };

  res.render("index", locals);
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
