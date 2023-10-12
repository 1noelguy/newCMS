const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

//http://localhost:3000/api/signup
router.post(
  "/signup",
  userMiddleware.validateRegister,
  async (req, res, next) => {
    await new Promise((resolve, reject) => {
      db.query(
        `SELECT userEmail FROM users WHERE userEmail = ${db.escape(
          req.body.userEmail
        )};`,
        (err, result) => {
          // console.log(result);
          if (result && result.length) {
            //username exists
            return res.status(409).send({
              message: "Username exists",
            });
          } else {
            // Username Valid
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                // throw err;
                return res.status(500).send({
                  message: err,
                });
              } else {
                db.query(
                  `INSERT INTO users (username, password, userEmail, roleID, team, linemanager, dateCreated) VALUES (${db.escape(
                    req.body.username
                  )},
                    '${hash}',${db.escape(req.body.userEmail)},${db.escape(
                    req.body.roleID
                  )},
                    ${db.escape(req.body.team)},${db.escape(
                    req.body.lineManager
                  )},now());`,
                  (err, result) => {
                    if (err) {
                      // throw err;
                      return res.status(400).send({
                        message: err,
                      });
                    }
                    resolve(result);
                    return res.status(201).send({
                      message: "Registered",
                    });
                  }
                );
              }
            });
          }
        }
      );
    });
  }
);

//http://localhost:3000/api/login
router.post("/login", async (req, res, next) => {
  await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
      (err, result) => {
        // console.log(result);
        if (err) {
          // throw err;
          return res.status(400).send({
            message: err,
          });
        }
        if (!result.length) {
          return res.status(400).send({
            message: "Username or Password incorrect!",
          });
        }

        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          (bErr, bResult) => {
            // console.log(result);
            if (bErr) {
              // throw bErr;
              return res.status(400).send({
                message: "Username or Password incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  username: result[0].username,
                  userID: result[0].userID,
                },
                "SECRETKEY",
                { expiresIn: "1h" }
              );
              // console.log(token)

              db.query(
                `UPDATE users SET last_login = now() WHERE userID = ${result[0].userID};`
              );
              res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
              return res.status(200).send({
                message: "logged in!",
                token,
                userID: result[0]["userID"],
                role: result[0]["roleID"],
              });
            }
            return res.status(400).send({
              message: "Username or Password incorrect!",
            });
          }
        );
      }
    );
  });
});
//http://localhost:3000/api/secret-route
router.get(
  "/allUsers", //userMiddleware.isLoggedIn,
  async (req, res, next) => {
    console.log(req.useData);
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
          // throw err;
          res.status(400).send({
            message: err,
          });
        } else {
          resolve(result);
          res.status(200).send({
            message: "test sucessful!",
            data: result,
          });
        }
      });
    });
  }
);

// router.get(
//   "/allCertificates", //userMiddleware.isLoggedIn,
//   async (req, res, next) => {
//     console.log(req.useData);
//     await new Promise((resolve, reject) => {
//       db.query(`SELECT * FROM certificates`, (err, result) => {
//         if (err) {
//           // throw err;
//           res.status(400).send({
//             message: err,
//           });
//         } else {
//           resolve(result);
//           res.status(200).send({
//             message: "test sucessful!",
//             data: result,
//           });
//         }
//       });
//     });
//   }
// );

router.get("/logout", userMiddleware.isLoggedIn, async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.send({
      message: "Done",
    });
  } catch (err) {
    console.log(err);
  }
  // res.cookie('jwt', '', { maxAge: 1});
  // res.redirect('/')
});

module.exports = router;
