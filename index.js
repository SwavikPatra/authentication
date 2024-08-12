import express from "express";
import cors from "cors";
import sequelize from "./models/database.js";
import User from "./models/user.js";

import auth from "./routes/auth.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // This allows cookies to be sent with requests
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database creation successfull");
  } catch (err) {
    console.log("Error while conecting to the database: ", err);
  }
};

// syncDatabase();

app.use("/auth", auth);

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
});
