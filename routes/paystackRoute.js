const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/initialize", async (req, res) => {
  const { email, amount } = req.body;
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.log(process.env.PAYSTACK_SECRET_KEY);
    console.error("This is our Error:", error.response.data);
    res.status(500).json({ messagee: "Payment initialization failed" });
  }
});

router.get("/verify", async (req, res) => {
  const { reference } = req.query;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    if (response.data.data.status === "success") {
      return res.json({
        message: "Payment verified successfully",
        data: response.data.data,
      });
    }

    res.status(400).json({ message: "Payment not successful" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;
