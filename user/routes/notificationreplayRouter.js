const express = require("express");
const route = express.Router();
const notification = require("../../admin/models/notificationModel.js");
const notificationreplay = require("../models/notificationreplayModel.js");
const verifyToken = require("../../jwt/token.js");

route.post("/", (req, res) => {
  const ad = new notificationreplay(req.body);
  ad.save();
  res.status(201).json({ ad });
});

route.get("/", verifyToken, async (req, res) => {
  const allnotification = await notificationreplay.find();
  res.status(200).json(allnotification);
});

// route.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const notification = await notificationreplay.findById(req.params.id);
//     res.status(201).json({ notification });
//   } catch (err) {
//     res.status(500).json({ err: "comments not found" });
//   }
// });

route.put("/:id", verifyToken, async (req, res) => {
  const notification = await notificationreplay.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(notification);
});

route.delete("/:id", verifyToken, async (req, res) => {
  const notification = await notificationreplay.findByIdAndDelete(req.params.id);
  res.status(201).json(notification);
});

route.get("/all", verifyToken, async (req, res) => {
  const allnotification = await notification
    .aggregate([
      {
        $lookup: {
          from: "notificationreplay",
          localField: "_id",
          foreignField: "notificationid",
          as: "notifications",
        },
      },
    ])
    .then((allnotification) => {
      res.status(200).json(allnotification);
    })
    .catch((err) => {
      res.status(500).json({ err: "comments not found" });
    });
});

module.exports = route;
