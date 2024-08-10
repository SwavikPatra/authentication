import Sequelize from "sequelize";

const sequelize = new Sequelize("authentication", "root", "12331233", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("the connection to the database established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });

export default sequelize;
