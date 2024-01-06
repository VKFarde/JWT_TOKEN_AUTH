const bcrypt = require("bcrypt");
const User = require("../config/model/usermodel");
const saltRound = 10;
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, Email, Password are requied field." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already Register." });
    }
    const salt = await bcrypt.genSalt(saltRound);
    const hashpass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashpass,
    });

    await newUser.save();

    res.status(200).json({ Register: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = Register;
