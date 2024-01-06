const jwt = require("jsonwebtoken");
const key = require("./key");

const Auth = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const valid = jwt.verify(token, key);
    req.user = valid;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = Auth;
