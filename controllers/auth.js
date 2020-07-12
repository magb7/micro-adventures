const { connection, tokenSecret } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passport/passport-strategies");

const createUser = async (req, res) => {
  try {
    // Password encryption
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Insertion in database
    const [resReq] = await connection.query("INSERT INTO user SET ?", [
      req.body,
    ]);

    // Creation of a user to make token
    const user = {
      mail: req.body.email,
      id: resReq.insertId,
    };

    // Creation of the token
    const token = jwt.sign(user, `${tokenSecret}`);

    // Sending back to the user the token and minor information
    return res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.status(500).send("Error while creating user");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

const connectUser = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, msg) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    // if the user does not exist or the password is wrong
    if (!user) {
      console.log(msg.msg);
      return res.sendStatus(500);
    }
    // Recreate the token
    const token = jwt.sign(user, `${tokenSecret}`);

    return res.status(200).send({
      user,
      token,
    });
  })(req, res);
};

module.exports = { createUser, connectUser };
