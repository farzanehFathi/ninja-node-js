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
      currentRoute: "/",
    });
  } catch (err) {
    console.log(err);
  }
});

// GET --- POST

router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: "NodeJs Blog",
      description: `${data.title}`,
    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (err) {
    console.log(err);
  }
});

// POST --- searchTerm

router.post("/search", async (req, res) => {
  try {
    const locals = { title: "Search", description: "Search the site" };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { data, locals });
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", (req, res) => {
  res.render("about", { currentRoute: "/about" });
});

module.exports = router;
