var express = require("express");
const { Comment } = require("../models/comments-model");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.put("/", async function (req, res, next) {
  try {
    const newComment = {
      ...req.body,
      rating: 0,
    };

    const comment = await Comment.create(newComment);

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/upvote/:id", async function (req, res, next) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.rating = comment.rating + 1;
    await comment.save();

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/downvote/:id", async function (req, res, next) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.rating = comment.rating - 1;
    await comment.save();

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
