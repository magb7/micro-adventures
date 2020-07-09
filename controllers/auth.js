const { connection } = require("../conf");

const createUser = async (req, res) => {
  try {
    const user = await connection.query("INSERT INTO user SET ?", [req.body]);
    return res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send("Error while creating user");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

module.exports = { createUser };
