const { connection } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  connection.query("INSERT INTO user SET ?", [req.body], (errReq, resReq) => {
    if (errReq) {
      console.log(errReq.sql);
      console.log(errReq.message);
      return res.status(500).send("Error while creating user");
    }
    const user = {
      mail: req.body.email,
      id: resReq.insertId,
    };

    const token = jwt.sign(user, "secret");

    return res.status(200).send({
      user,
      token,
    });
  });
};

module.exports = { createUser };
