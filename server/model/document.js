const mongoose = require("mongoose");
const documentChildSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});
const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  children: { type: documentChildSchema, required: true },
  description: { type: String },
});
module.exports = mongoose.model("Document", documentSchema);
