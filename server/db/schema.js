// schema.js
const { Sequelize, DataTypes } = require("sequelize");
const { Comment } = require("./comments-model");
require("dotenv").config();

function initializeDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });

  // Sync models with database only for development
  if (process.env.NODE_ENV === "development") {
    sequelize.sync();
  }

  Comment.init(
    {
      author: DataTypes.STRING,
      content: DataTypes.STRING,
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: DataTypes.INTEGER,
    },
    { sequelize, modelName: "comment" }
  );

  return sequelize;
}

module.exports = { initializeDatabase };
