const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { connection } = require("../conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (formMail, formPass, done) => {
      connection.query(
        "SELECT id, email, password FROM user WHERE email=?",
        [formMail],
        (err, res) => {
          if (err) {
            console.log(err.sql);
            console.error(err.message);
            return done(err);
          }
          if (!res.length) {
            return done(null, false, {
              msg: "Incorrect user!",
            });
          }
          // Get user information
          const user = res[0];
          // Compare password
          const isPasswordOk = bcrypt.compareSync(formPass, user.password);

          // handle error
          if (!isPasswordOk) {
            return done(null, false, {
              msg: "Incorrect password !",
            });
          }
          return done(null, { ...user });
        }
      );
    }
  )
);
