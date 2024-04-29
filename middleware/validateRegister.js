import { User } from "../models/usersModel.js";

const validateRegister = async (req, res, next) => {
  const { username, email, password, picture, verified } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All inputs must be filled" });
  }

  // Email Validation
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: "Email already registered" });
  }

  if (!email.includes("@gmail")) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  // Username Valdiation
  if (username.length < 4) {
    return res
      .status(400)
      .json({ error: "Username must be at least 4 characters long" });
  } else if (username.length > 16) {
    return res
      .status(400)
      .send({ error: "Username must only be 16 characters or less" });
  } else if (!/^[a-zA-Z]*$/.test(username)) {
    return res
      .status(400)
      .send({ error: "Username must only contain alphabet characters" });
  }

  // Password Validation
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  req.validatedInput = { username, email, password, picture, verified };

  next();
};

export default validateRegister;
