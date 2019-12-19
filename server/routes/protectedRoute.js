module.exports = (req, res, next) => {
  console.log("HAIHADHSHDHS");
  if (!req.session.user)
    res.status(401).json({ message: "You are not logged in!" });
  next();
};
