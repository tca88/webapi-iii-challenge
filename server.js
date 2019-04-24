const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const postsRouter = require("./routers/posts-router.js");
const usersRouter = require("./routers/users-router.js");

const server = express();
// check name on request body, turn it to uppercase then send it to the next function.
function upperCase(req, res, next) {
  const name = req.body.name;
  if (req.method === "POST" || req.method === "PUT") {
    req.body.name = name.toUpperCase();
    next(); // keep on running through the usersRouter. If you don't do this, then it won't hit usersRouter middleware.
  } else {
    next(); // also sends it to the router.
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
server.use("/api/users", upperCase, usersRouter);

// export default server
module.exports = server; // <<<<<<<<<<<<<<<<<<<<<<<<<<  export the server
