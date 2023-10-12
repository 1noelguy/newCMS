const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const jwt = require("jsonwebtoken");

//submit certificate
router.post(
  "/addCert",
  //  userMiddleware.isLoggedIn,
  async (req, res, next) => {
    const query = `INSERT INTO certificates (
        userEmail,
        projectTitle,
        projectPurpose,
        revGen,
        externalUsers,
        degEffect,
        requestType,
        managerApproval,
        serverSpecs,
        domainName,
        dnsMappingReq,
        wafConfig,
        serverHostname,
        serverAddress,
        operatingSystem,
        portNumber,
        status,
        dateRequested) VALUES (
        ${db.escape(req.body.userEmail)},
        ${db.escape(req.body.projectTitle)},
        ${db.escape(req.body.projectPurpose)},
        ${db.escape(req.body.revGen)},
        ${db.escape(req.body.externalUsers)},
        ${db.escape(req.body.degEffect)},
        ${db.escape(req.body.requestType)},
        ${db.escape(req.body.managerApproval)},
        ${db.escape(req.body.serverSpecs)},
        ${db.escape(req.body.domainName)},
        ${db.escape(req.body.dnsMappingReq)},
        ${db.escape(req.body.wafConfig)},
        ${db.escape(req.body.serverHostname)},
        ${db.escape(req.body.serverAddress)},
        ${db.escape(req.body.operatingSystem)},
        ${db.escape(req.body.portNumber)},
        ${db.escape(req.body.status)},
        now());`;

    try {
      await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              Message: err,
            });
          } else {
            resolve(result);
            return res.status(200).send({
              message: "Success!",
              data: result,
            });
          }
        });
      });
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  }
);

//Get All Certificates
router.get(
  "/allCerts",
  //userMiddleware.isLoggedIn
  async (req, res) => {
    // res.send("Get all users");
    const query = "SELECT * FROM certificates;";

    try {
      await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            resolve(result);
            return res.status(200).send({
              message: "Success!",
              data: result,
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
);

//Get A Particular user
router.get(
  "/certById/:certificateID",
  userMiddleware.isLoggedIn,
  async (req, res) => {
    const certID = req.params.certificateID;
    // console.log(certificateID);

    const query = `SELECT * FROM certificates WHERE certificateID= ?;`;

    try {
      await new Promise((resolve, reject) => {
        db.query(query, [certID], (err, result) => {
          if (err) {
            return res.status(400).send({
              message: err,
            });
          } else {
            resolve(result);
            return res.status(200).send({
              message: "Success!",
              data: result,
            });
          }
        });
      });
    } catch (error) {
      return res.status(400).send({
        message: err,
      });
    }
  }
);

// Get Certificates for a particular user
router.get("/myCerts/", async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "SECRETKEY", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // res.locals.user = "im here";
      } else {
        console.log(decodedToken);
        await db.query(
          `select userEmail from users where userID = ${db.escape(
            decodedToken.userID
          )}`,
          async (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(result);
              // console.log("i mean here",);
              try {
                const query = `SELECT * FROM certificates WHERE userEmail = ?;`;

                await new Promise((resolve, reject) => {
                  db.query(query, [result[0].userEmail], (err, result) => {
                    if (err) {
                      return res.status(400).send({
                        message: err,
                      });
                    } else {
                      resolve(result);
                      return res.status(200).send({
                        message: "Success!",
                        data: result,
                      });
                    }
                  });
                });
              } catch (error) {
                return res.status(400).send({
                  message: error,
                });
              }
            }
          }
        );
      }
    });
  } else {
    res.locals.user = "here Rather";
  }
});

//Update user
router.put("", userMiddleware.isLoggedIn, (req, res) => {});

//Delete User
router.delete("", userMiddleware.isLoggedIn, (req, res) => {});

module.exports = router;
