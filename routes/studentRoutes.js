const Student = require("../models/student");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const authenticate = require("../middleware/authMiddleware");
const RoleAuthenticate = require("../middleware/roleMiddleware");
const transport = require("../utils/mailer");

// fs.writeFile("text.html", "!","\n <h1>Olamide</h1>", (err) => {
//   if (err) {
//     console.log("Error Creating File");
//   } else {
//     console.log("File Created Successfully");
//   }
// });

// fs.appendFile("text.txt", "\n <h1>12 october 2024</h1>", (err) => {
//   if (err) {
//     console.log("Error Creating File");
//   } else {
//     console.log("File Created Successfully");
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.array("image", 6), (req, res) => {
  res.json({
    message: "File Uploaded Successfully",
    file: req.file,
  });
});

// CREATE NEW STUDENT
router.post(
  "/student/create/",
  upload.array("profilePic", 5),
  async (req, res) => {
    try {
      const { fullName, course, age } = req.body;
      if (!fullName || !course || !age) {
        return res
          .status(401)

          .json({ message: "Please provide a valid input" });
      }

      const imageFiles = req.files
        ? req.files.map((file) => file.filename)
        : [];

      const newStudent = await Student.create({
        fullName,
        course,
        age,
        profilePic: imageFiles,
      });

      res.status(201).json(newStudent);
    } catch (error) {
      const Error = res.status(500).json(error.message);
      console.log(Error);
    }
  },
);

// GET ALL STUDENTS
// skip = ( page - 1 ) * limit

router.get(
  "/student",
  // authenticate,
  // RoleAuthenticate ("student"),
  async (req, res) => {
    const { page = 1, limit = 5, course, search } = req.query;

    const query = {};
    if (course) query.course = course;
    if (search) {
      query.fullName = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    try {
      const allStudents = await Student.find(query)
        .skip(skip)
        .limit(Number(limit));
      const total = await Student.countDocuments(query);
      // const allStudents = await Student.find(filter);
      // const allStudents = await Student.find().skip(skip).limit(limit);
      // const totalStudents = await Student.countDocuments();

      // res.json({ totalOfStudents: totalStudents, allStudents});
      res.json({
        page,
        skip,
        total,
        allStudents,
      });
    } catch (error) {
      const Error = res.status(400).json(error.message);
      console.log(Error);
    }
  },
);

// GET SINGLE STUDENT
router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    res.json(Student);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE SINGLE STUDENT
router.put("/student/update/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE STUDENT
router.delete("/student/delete/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    res.status(200).json({ message: "Student Successfully Deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//CONTACT ROUTE
router.post("/contact", async (req, res) => {
  const { email, message, firstName, lastName, phoneNumber } = req.body;

  try {
    console.log("Incoming contact form data:", req.body);
//     await transport.sendMail({
//       from: process.env.GMAIL_USER,
//       to: "adegboyegaolamide00@gmail.com",
//       subject: "New Contact Message",
//       text: `
// Name: ${firstName} ${lastName}
// Phone: ${phoneNumber}
// Email: ${email}

// Message:
// ${message}
//   `,
//     });
    res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// RESTful API
// REPRESENTATIONAL STATE TRANSFER

// PAGINATION
// skip = ( page - 1 ) * limit

// const page = Number(req.query.page) || 1;
// const limit = Number(req.query.limit) || 5;
// const skip =  ( page - 1 ) * limit;

// const { course } = req.query;
// const filter = {};
// if (course) filter.course = course;

// const { age } = req.query;
// const getAge = {};
// if (age) getAge.age = age;

// const { search } = req.query;
// const query = {};
// if (search) {
//   query.fullName = { $regex: search, $options: "i" };
// }
