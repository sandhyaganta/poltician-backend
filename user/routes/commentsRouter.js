const express = require("express");
const route = express.Router();
const commentsModel = require("../models/commentsModel.js");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../jwt/token.js");
const adminpostModel = require("../../admin/models/adminpostModel.js");

route.post("/comment", (req, res) => {
  const ad = new commentsModel(req.body);
  ad.save();
  res.status(201).json(ad);
});

route.get("/get/comments",verifyToken, async (req, res) => {

    const allcomments = await adminpostModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postid',
          as: 'commentsdetails'
        }
      }
    ])
    .then(allcomments => {
      res.send(allcomments);
   }).catch(err => {
    res.send(err);
   })
 
});

route.put("/updateById/:id",verifyToken, async (req, res) => {
  const comments = await comment.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(comments);
});

route.get("/getById/:id",verifyToken, async (req, res) => {
  try {
    const user = await comments.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "comments not found" });
  }
});

module.exports = route;
