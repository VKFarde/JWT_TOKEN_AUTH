const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../config/model/usermodel");
const key = require("../control/Auth/key.js");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and PassWord Required" });
  }

  const users = await User.findOne({ email: email });
  console.log(password, users.password);

  if (!users) {
    return res.status(400).json({ error: "User not Register", succes: false });
  }

  try {
    const match = await bcrypt.compare(password, users.password);
    if (match) {
      const Token = await jwt.sign(
        { userId: users._id, email: users.email },
        key,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: Token, succes: true });
    } else {
      res.status(400).json({ error: "Incorrect Password", sucess: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error", succes: false });
  }
};

module.exports = Login;
