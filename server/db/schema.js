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
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: "comment" }
  );

  return sequelize;
}

module.exports = { initializeDatabase };
