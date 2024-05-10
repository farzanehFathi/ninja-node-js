const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Routes

// GET --- HOME
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simpe Blog created with NodeJs, Express & MongoDb",
    };

    let perPage = 7;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { CreatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // const data = await Post.find();
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
