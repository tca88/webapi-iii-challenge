// code away!
const envReader = require("dotenv");
envReader.config();
const server = require("./server.js");

const port = process.env.PORT || 5002;

server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:5002 ***\n");
});
