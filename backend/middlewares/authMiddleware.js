const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer '
  if (!token)
    return res.status(401).json({ msg: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.user = decoded; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = userMiddleware;
