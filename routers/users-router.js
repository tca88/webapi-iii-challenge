const express = require("express");

const Users = require("../data/helpers/userDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Users.get();
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
    const user = await Users.getUserPosts(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The posts with the specified User ID does not exist."
      });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved for the User ID."
    });
  }
});

// router.get("/:id", (req, res) => {
//   Users.getUserPosts(req.params.id)
//     .then(user => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: "Hub not found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the hub"
//       });
//     });
// });

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    console.log("New User", req.body);
    if (user.name === undefined || user.name === "") {
      res.status(400).json({
        message: "Please provide a name for the user."
      });
    } else {
      const { id } = await Users.insert(user);
      const addedUser = await Users.getById(id);
      res.status(201).json(addedUser);
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
    const { name } = req.body;
    // console.log("Updated User", req.body);
    const user = await Users.getById(id);

    if (!user) {
      res.status(404).json({
        message: "The post with the specified User ID does not exist."
      });
    }
    // console.log(1);
    if (!name) {
      res.status(400).json({ message: "Please provide a name for the user" });
    }
    // console.log(2);
    const updateResult = await Users.update(id, req.body);
    // console.log(3);
    if (updateResult) {
      const user = await Users.getById(id);
      res.status(200).json(user);
    }
    // console.log(4);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The user information could not be modified." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.remove(req.params.id);
    if (user) {
      res.status(200).json({ message: "The user has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The user could not be removed"
    });
  }
});

module.exports = router;
