import express from "express";
import cors from "cors";
import sequelize from "./models/database.js";
import User from "./models/user.js";

const app = express();
app.use(cors());
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

syncDatabase();

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
});
