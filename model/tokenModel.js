const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  token: { type: String, required: true },
});

const tokenModel = mongoose.model("pushToken", tokenSchema);

module.exports = tokenModel;
