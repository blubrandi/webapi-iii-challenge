const express = require("express");

const posts = require("../data/helpers/postDb");
const users = require("../data/helpers/userDb");

const router = express.Router();

function capitalizeName(req, res, next) {
  req.body.name = req.body.name.charAt[0].toUpperCase();
  next();
}

//POSTS

// - GET all posts

router.get("/", (req, res, next) => {
  posts
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error, message: "Posts could not be retrieved." });
    });
});

// - GET posts by id

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  posts
    .getById(id)
    .then(post => {
      if (post === 0) {
        return res(404).json({
          message: "The post you're looking for cannot be found."
        });
      }
      res.json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error, message: "Post could not be retrieved." });
    });
});

// GET all posts by user_id
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(post => {
      res.json(post);
    })
    .catch(error => {
      res.status(404).json({ error: error, message: "No posts available" });
    });
});

// - POST add a post

router.post("/", capitalizeName, (req, res) => {
  const { user_id, text } = req.body;
  posts
    .insert({ user_id, text })
    .then(post => {
      res.json(post);
    })
    .catch(error => {
      res.status(500).json({ error: error, message: "Cannot add post" });
    });
});

// - PUT change a post

router.put("/:id", capitalizeName, (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  posts
    .update(id, { text })
    .then(post => {
      res.json(post);
    })
    .catch(error => {
      res.status(500).json({ error: error, message: "Cannot update post" });
    });
});

// - DELETE remove a post by ID

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  posts
    .remove(id)
    .then(post => {
      res.json({ message: "Your post has been removed" });
    })
    .catch(error => {
      res.status(500).json({ error: error, message: "Cannot remove post" });
    });
});

module.exports = router;
