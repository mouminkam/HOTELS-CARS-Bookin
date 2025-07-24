export const verifyAdmin = (req, res, next) => {
  //
  if (req.user.role !== "admin") {
    return res.status(403).send("You Don't Have The Permission");
  }
  //
  next();
};
