const { connection } = require("../conf");

const createUser = (req, res) => {
  return res.status(200).send("I am in POST signup");
};

module.exports = { createUser };
