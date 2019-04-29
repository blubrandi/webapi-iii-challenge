const express = require("express");

const server = express();

const postsRouter = require("./routers/posts-router.js");

server.use(express.json());

server.get("/", (req, res, next) => {
  res.send(`
    <h1>Hello</h1>
    `);
});

server.use("/api/posts", postsRouter);
module.exports = server;
