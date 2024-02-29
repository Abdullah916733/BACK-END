require("dotenv").config();
const express = require("express");
const app = express();
const Register = require("./models/register");
require("./db/connect");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const { send } = require("process");
const port = process.env.Port || 5000;

const indexPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(indexPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/secret", auth, (req, res) => {
  res.render("secret");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// regiter user and store data in database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        password: password,
        confirmpassword: confirmpassword,
      });

      const token = await registerEmployee.generateToken();
      console.log(token);

      // create a cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });

      await registerEmployee.save();

      res.status(200).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

// login method if user exist
app.post("/login", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const existEmail = await Register.findOne({ email: email });

    const matchEmail = await bcrypt.compare(password, existEmail.password);

    const token = await existEmail.generateToken();

    // create a cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60000),
      httpOnly: true,
      // secure:true,
    });

    if (matchEmail) {
      res.status(200).render("index");
    } else {
      res.send("invalid login password");
    }
  } catch (err) {
    res.status(400).send("invalid login details");
  }
});

app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentElem) => {
      return currentElem.token !== req.token;
    });
    res.clearCookie("jwt");
    await req.user.save();
    res.status(200).render("login");
  } catch (err) {
    res.status(500), send(err);
  }
});

app.listen(port, () => {
  console.log(`localhost working on port no : ${port}`);
});
