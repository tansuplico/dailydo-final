import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET);
    req.authInfo = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: `Error: ${error}` });
  }
};

export default authenticateToken;
