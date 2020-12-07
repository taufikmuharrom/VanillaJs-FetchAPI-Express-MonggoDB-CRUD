const express = require("express");
const router = express.Router();

// posts Model
const Posts = require("../../model/Post");

// @routes GET api/posts
// @desc Get all post

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Items");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes GET api/posts
// @desc Get a post by id

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("Id not found");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes POST api/posts
// @desc Create A post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// @routes DELETE api/posts/:id
// @desc Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("No post found!");
    res.status(200).json({ message: "deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// @routes PUT api/posts/:id
// @desc update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("Something went wrong while updating the post!");
    res.status(200).json({ message: `Post was successfully updated` });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
