require("dotenv").config();

const MONGOURI = process.env.MONGOURI;

const config = {
  mongoURI: MONGOURI,
};

module.exports = config;
