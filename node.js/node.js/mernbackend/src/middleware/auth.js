const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const varification = jwt.verify(token, process.env.SECRET_KEY);
    const findUser = await Register.findOne({ _id: varification._id });

    req.token = token;
    req.user = findUser;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = auth;
