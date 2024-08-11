// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; // Import your User model

const auth = express.Router(); // Changed variable name to auth

// Handle user signup
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

// Sync the model with the database if needed
// sequelize.sync();

export default auth; // Export the auth router
