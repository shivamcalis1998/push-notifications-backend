const express = require("express");
const  tokenModel  = require("../model/tokenModel");
const dotenv = require("dotenv");
dotenv.config();

const tokenRoute = express.Router();

tokenRoute.post("/", async (req, res) => {
  try {
    const { token } = req.headers;

    const newToken = new tokenModel({
      token: token,
    });

    await newToken.save();

    res.status(201).json({ message: "Token saved successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

tokenRoute.get("/", async (req, res) => {
  try {
    const tokens = await tokenModel.find();

    res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = tokenRoute;
