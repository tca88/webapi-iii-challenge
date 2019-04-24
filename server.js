const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const postsRouter = require("./routers/posts-router.js");
const usersRouter = require("./routers/users-router.js");

const server = express();

function upperCase(req, res, next) {
  const method = req.method;
  const { name } = req.body.name;
  if (method === "POST") {
    res.status(200).send(name.toUpperCase());
    next();
  } else {
    res.status(401).send("You shall not pass");
  }
}

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res, next) => {
  res.send(`
    <h2>Lambda Posts and Users API</h>
    <p>Welcome to the Lambda Posts and Users API 😀</p>
  `);
});
console.log(postsRouter);

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter, upperCase);

// export default server
module.exports = server; // <<<<<<<<<<<<<<<<<<<<<<<<<<  export the server
