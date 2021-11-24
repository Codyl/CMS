const express = require("express");
const router = express.Router();
module.exports = router;

const sequenceGenerator = require("./sequenceGenerator");
const message = require("../model/message");

router.get("/", (req, res, next) => {
  const messages = message.find().catch((error) => {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  });

  return res.status(200).json({
    messages: messages,
  });
});

router.post("/", (req, res, next) => {
  const maxmessageId = sequenceGenerator.nextId("messages");

  const message = new message({
    id: maxmessageId,
    msgText: req.body.msgText,
    sender: req.body.sender,
    subject: req.body.subject,
  });

  message
    .save()
    .then((createdmessage) => {
      res.status(201).json({
        message: "message added successfully",
        message: createdmessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  message.findOne({ id: req.params.id })
    .then((message) => {
      message.id = req.body.id;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;
      message.subject = req.body.subject;

      message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "message not found.",
        error: { message: "message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  message.findOne({ id: req.params.id })
    .then((message) => {
      message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "message not found.",
        error: { message: "message not found" },
      });
    });
});
