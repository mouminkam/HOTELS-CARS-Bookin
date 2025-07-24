export const validatename = (req, res, next) => {
  //
  const { fullname } = req.body;
  if (!fullname || typeof fullname !== "string" || fullname.trim() === "") {
    return res.status(400).send("Invalid name");
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).send("Invalid email");
  }

  next();
};

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || typeof password !== "string" || password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters.");
  }

  next();
};
