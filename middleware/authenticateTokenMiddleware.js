import jwt from "jsonwebtoken";

const JWT_SECRET =
  "f3d2b31b2f6e84c930d8b658c8e8a45e789d6de69e5476e621e08d6c7c4ec80c"; // Change this to your secure secret

const authenticateTokenMiddleware = (req, res, next) => {
  console.log("inside middleware");
  const JWTToken = req.cookies.JWTToken; // Extract JWTToken from the request payload
  console.log(JWTToken);
  if (!JWTToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No JWTToken provided." });
  }

  try {
    const decoded = jwt.verify(JWTToken, JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request object
    next(); // Call the next middleware/route handler
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid JWTToken." });
  }
};

export default authenticateTokenMiddleware;
// Use the middleware in your route as before
