const express = require("express");

const Posts = require("../data/helpers/postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    console.log("New Post", req.body);
    if (
      post.text === undefined ||
      post.text === "" ||
      post.user_id === undefined ||
      post.user_id === ""
    ) {
      res.status(400).json({
        message: "Please provide all of the required information for the post."
      });
    } else {
      const { id } = await Posts.insert(post);
      const addedPost = await Posts.getById(id);
      res.status(201).json(addedPost);
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user_id } = req.body;
    console.log("Updated Post", req.body);
    const post = await Posts.getById(id);

    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    if (!text || !user_id) {
      res
        .status(400)
        .json({ message: "Please provide text and user id for the post." });
    }
    const updateResult = await Posts.update(id, req.body);
    if (updateResult) {
      const post = await Posts.getById(id);
      res.status(200).json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    if (post) {
      res.status(200).json({ message: "The post has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

module.exports = router;
