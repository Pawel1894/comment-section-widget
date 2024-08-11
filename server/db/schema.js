// schema.js
const { Sequelize, DataTypes } = require("sequelize");
const { Comment } = require("./comments-model");
const { Topic } = require("./topic-model");
require("dotenv").config();

function initializeDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });

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
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: "comment" }
  );

  Topic.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "topic" }
  );

  Topic.hasMany(Comment, { foreignKey: "topicId" });
  Comment.belongsTo(Topic, { foreignKey: "topicId" });

  if (process.env.NODE_ENV === "development") {
    sequelize
      .sync()
      .then(() => {
        console.log("Database synchronized.");
      })
      .catch((error) => {
        console.error("Error synchronizing database:", error);
      });
  }

  return sequelize;
}

module.exports = { initializeDatabase };
