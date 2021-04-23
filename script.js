const express = require("express");

const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const College = require("./models/college");
const Student = require("./models/student");
const { RSA_NO_PADDING } = require("constants");
const college = require("./models/college");

const app = express();
const server = http.createServer(app);

app.use(express.json({ extended: false }));
app.use(cors());
connectDB();

app.get("/getCollegeDetails", async (req, res) => {
  try {
    const college = await College.findOne(req.query);
    if (!college) {
      res.status(400).json({ msg: "no matching college found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.get("/getStudentsInCollege", async (req, res) => {
  try {
    const studentsInCollege = await Student.find(req.query);
    res.json(studentsInCollege);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.get("/getSimilarColleges", async (req, res) => {
  try {
    const college = await College.findById(req.query._id);
    const similarColleges = await College.aggregate([
      {
        $match: {
          Courses: {
            $elemMatch: {
              $exists: true,
            },
          },
        },
      },
      {
        $addFields: {
          size: {
            $size: {
              $setIntersection: ["$Courses", college.Courses],
            },
          },
        },
      },
      {
        $match: {
          size: {
            $gte: 2,
          },
        },
      },
    ]);
    res.json(similarColleges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.get("/getCollegeList", async (req, res) => {
  try {
    let response;
    if (req.query.key === "State") {
      response = await College.find({ state: req.query.label });
    } else {
      response = await College.find({ Courses: { $all: [req.query.label] } });
    }
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Server Up and Running"));
server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
