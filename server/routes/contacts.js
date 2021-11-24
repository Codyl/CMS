const express = require("express");
const router = express.Router();
module.exports = router;

const sequenceGenerator = require("./sequenceGenerator");
const contact = require("../model/contact");

router.get("/", (req, res, next) => {
  const contacts = contact.find().catch((error) => {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  });

  return res.status(200).json({
    contacts: contacts,
  });
});

router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new contact({
    id: maxContactId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    phone: req.body.phone,
    email: req.body.email,
    group: req.body.group,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "contact added successfully",
        contact: createdContact,
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
  contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.id = req.body.id;
      contact.imageUrl = req.body.imageUrl;
      contact.phone = req.body.phone;
      contact.group = req.body.group;

      contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            message: "contact updated successfully",
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
        message: "contact not found.",
        error: { contact: "contact not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "contact deleted successfully",
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
        message: "contact not found.",
        error: { contact: "contact not found" },
      });
    });
});
