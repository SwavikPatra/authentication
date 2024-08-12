import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key"; // Change this to your secure secret

const authMiddleware = (req, res, next) => {
  const { token } = req.body; // Extract token from the request payload

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request object
    next(); // Call the next middleware/route handler
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

// Use the middleware in your route as before
