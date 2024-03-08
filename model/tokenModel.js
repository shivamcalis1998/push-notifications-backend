const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

const tokenModel = mongoose.model("pushToken", tokenSchema);

module.exports = tokenModel;
