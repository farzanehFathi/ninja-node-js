const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET
// HOME

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      descirption: "Simple blog crated with NodeJs, Express & MongoDb",
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

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

// GET
// post
router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      descirption: "Simple blog crated with NodeJs, Express & MongoDb",
    };

    res.render("post", { locals, data });
  } catch (err) {
    console.log(err);
  }
});
