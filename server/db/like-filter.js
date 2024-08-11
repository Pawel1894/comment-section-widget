const { Op } = require("sequelize");

function createLikeFilter(property, search) {
  return search ? { [property]: { [Op.like]: `%${search}%` } } : {};
}

module.exports = { createLikeFilter };
