const express = require("express");
const router = express.Router();
const { Comment } = require("../db/comments-model");
const { Topic } = require("../db/topic-model");
const { createLikeFilter } = require("../db/like-filter");

router.get("/topic/:topicId/comment", async function (req, res, next) {
  try {
    const { topicId } = req.params;
    const comments = await Comment.findAll({
      where: { topicId },
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.put("/topic/:topicId/comment", async function (req, res, next) {
  if (!topicId) {
    return res.status(400).json({ error: "Topic ID is required" });
  }

  try {
    const { topicId } = req.params;
    const comment = await Comment.create({ ...req.body, topicId });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/comment/upvote/:id", async function (req, res, next) {
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

router.post("/comment/downvote/:id", async function (req, res, next) {
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

router.get("/topic", async function (req, res, next) {
  try {
    const { search } = req.query;

    const topics = await Topic.findAll({
      where: {
        ...createLikeFilter("content", search),
      },
    });
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

router.put("/topic", async function (req, res, next) {
  try {
    const topic = await Topic.create(req.body);
    res.json(topic);
  } catch (error) {
    next(error);
  }
});

router.get("/topic/:id", async function (req, res, next) {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
