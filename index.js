const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const studentRoute = require("./routes/studentRoutes");
const authRoute = require("./routes/authRoutes");
const paystackRoute = require("./routes/paystackRoute");

require("dotenv").config();

app.use(express.json());
// app.options("/*", cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://adegboyegaolamide.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database is Running"))
  .catch((error) => console.error("This is our Error", error));

app.use("/api", studentRoute);
app.use("/auth", authRoute);
app.use("/paystack", paystackRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend Is Live");
});



// m4EozUTVy1GDypXt
// mongodb+srv://adegboyega00001_db_user:m4EozUTVy1GDypXt@index.8l2jh9v.mongodb.net/?appName=Index
