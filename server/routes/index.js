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
      order: [["createdAt", "DESC"]],
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.put("/topic/:topicId/comment", async function (req, res, next) {
  const { topicId } = req.params;

  if (!topicId) {
    return res.status(400).json({ error: "Topic ID is required" });
  }

  try {
    const comment = await Comment.create({ ...req.body, topicId });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/comment/vote/:id", async function (req, res, next) {
  // Since there is no authentication, we can't prevent users from voting multiple times
  // Potential solution would be to store voter's IP address and prevent multiple votes from the same IP

  try {
    const { action } = req.query; // Get the action from query parameters
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (action === "upvote") {
      comment.rating = comment.rating + 1;
    } else if (action === "downvote") {
      comment.rating = comment.rating - 1;
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await comment.save();
    res.json(comment.rating);
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
      order: [["createdAt", "DESC"]],
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
