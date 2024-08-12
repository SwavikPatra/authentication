// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; // Import your User model
import jwt from "jsonwebtoken";
import cors from "cors";

const auth = express.Router(); // Changed variable name to auth
const JWT_SECRET =
  "f3d2b31b2f6e84c930d8b658c8e8a45e789d6de69e5476e621e08d6c7c4ec80c";
// Handle user signup

auth.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // This allows cookies to be sent with requests
  })
);

auth.post("/signup", async (req, res) => {
  console.log("signup backend");
  const { username, email, password } = req.body;
  console.log(`username ${username}, password ${password}`);

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

auth.post("/login", async (req, res) => {
  console.log("in the login auth backend");
  const { email, password } = req.body;
  console.log(`${email}, ${password}`);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("auth backend, user not found");
      return res.status(400).json({ message: "Invalid Credential" });
    }
    console.log("user found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("auth backend, password wrong");
      return res.status(400).json({ message: "Invalid credential" });
    }
    console.log("is match successfull");
    const JWTToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(`jwt token : ${JWTToken}`);
    console.log("after jwt token creation");
    // Set the token in an HttpOnly cookie
    res.cookie("JWTToken", JWTToken, { maxAge: 3600000 }); // 1 hour
    console.log("Cookie set in response");

    res.status(200).json({ message: "Login successful", userId: user.id });
  } catch (err) {
    console.log("auth backend, catch error section");
    res.status(500).json({ message: "Server error" });
  }
});

// Sync the model with the database if needed
// sequelize.sync();

export default auth; // Export the auth router
