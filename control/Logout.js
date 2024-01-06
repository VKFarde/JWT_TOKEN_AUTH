const Logout = async (req, res) => {
  res.status(200).json({ sucees: true, token: null });
};

module.exports = Logout;
