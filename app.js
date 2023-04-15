const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("./model/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const axios = require("axios");
const { userValidationRules, validate } = require("./middleware/validator");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Hello World
app.get("/", (req, res) => {
  res.send("Hello, world");
});

//1 . Login using username and password
app.post("/login", userValidationRules(), validate, async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate if user exist
    const user = await findUserByUsername(username);

    if (user && (await bcrypt.compare(password, user?.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.json({
        status: true,
        message: "Success",
        data: user,
      });
    }
    return res.status(401).json({
      status: false,
      message: "Invalid credentials",
    });
  } catch (err) {
    console.log(err);
  }
});

//2. Get Job List
app.get("/jobs", auth, async (req, res) => {
  try {
    const response = await axios
      .get("http://dev3.dansmultipro.co.id/api/recruitment/positions.json", {
        params: {
          page: req.query.page ?? 1,
          description: req.query.description,
          location: req.query.location,
          full_time: req.query.full_time == "true" ? true : false,
        },
      })
      .catch(function (error) {
        return res.json({
          status: false,
          message: "an error occurred",
          data: [],
        });
      });
    const data = response.data;

    // Remove null array from object
    var filtered = data.filter(function (el) {
      return el != null;
    });

    return res.json({
      status: true,
      message: "Success",
      data: filtered,
    });
  } catch (error) {
    console.log(error);
  }
});

//3. Get Job List by id
app.get("/jobs/:id", auth, async (req, res) => {
  try {
    const response = await axios
      .get(
        "http://dev3.dansmultipro.co.id/api/recruitment/positions/" +
          req.params.id
      )
      .catch(function (error) {
        return res.json({
          status: false,
          message: "an error occurred",
          data: [],
        });
      });
      return res.json({
      status: true,
      message: "Success",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});
