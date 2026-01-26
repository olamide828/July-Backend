const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const transport = require("../utils/mailer");
const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

//REGISTRATION
router.post("/register", async (req, res) => {
  const { email, password, role, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });
    await newUser.save();
    transport.sendMail({
      to: email,
      subject: `welcome to our platform`,
      html: `<h1>Your "${email}" Registration is Complete</h1>
      <p>Your account has been successfully created.</p>
      `,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(500).json({ message: "Email or Password Incorrect" });
    }
    const isMatched = await bcrypt.compare(password, findUser.password);
    if (!isMatched) {
      return res.status(500).json({ message: "Email or Password Incorrect" });
    }
    const token = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
        password: findUser.password,
        role: findUser.role,
      },
      process.env.JSON_TOKEN_SECRET,
      {
        expiresIn: "5m",
      },
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Google Login
router.post("/google_login", async (req, res) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("GOOGLE PAYLOAD", payload);

    res.json({ message: "Google Auth Successful", payload });
  } catch (err) {
    console.error("GOOGLE VERIFY ERROR:", err.message);
    res.status(401).json({ message: "Goggle Authentication Failed" });
  }
});

//Json Web Token

module.exports = router;
