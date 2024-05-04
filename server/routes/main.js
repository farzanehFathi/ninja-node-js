const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET
// HOME
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simpe Blog created with NodeJs, Express & MongoDb",
    };

    let perPage = 7;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { Createdat: -1 } }])
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
    console.error(err);
    res.status(500).send("An error occurred while fetching posts.");
  }
});

// GET
// post: id
router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: "NodeJs Blog",
      description: `${data.title}`,
    };

    res.render("post", { locals, data });
  } catch (err) {
    console.log(err);
  }
});

// POST
// post search term

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "search for content",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpcialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpcialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpcialChar, "i") } },
      ],
    });
    res.render("search", { locals, data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
