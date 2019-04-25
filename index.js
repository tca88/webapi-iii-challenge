// code away!
const envReader = require("dotenv");
envReader.config();
const server = require("./server.js");

server.listen(9999, () => {
  console.log("\n* Server Running on http://localhost:9999 *\n");
});
