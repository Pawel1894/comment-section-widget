// schema.js
const { Sequelize, DataTypes } = require("sequelize");
const { Comment } = require("./comments-model");

function initializeDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });

  // Sync models with database
  sequelize.sync();

  Comment.init(
    {
      author: DataTypes.STRING,
      content: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    { sequelize, modelName: "comment" }
  );

  return sequelize;
}

module.exports = { initializeDatabase };
