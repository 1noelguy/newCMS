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

    const csrLink = req.body.csrLink;
    const confluenceLink = req.body.confluenceLink;

    const query     =       `INSERT INTO certificates (userEmail,projectTitle,projectPurpose,revGen,externalUsers,requestType,managerApproval,csrLink,domainName,dnsMappingReq,confluenceLink,serverAddress,operatingSystem,portNumber,status) VALUES (${db.escape(req.body.userEmail)},${db.escape(req.body.projectTitle)},${db.escape(req.body.projectPurpose)},${db.escape(req.body.revGen)},${db.escape(req.body.externalUsers)},${db.escape(req.body.requestType)},${db.escape(req.body.managerApproval)},${db.escape(req.body.csrLink)},${db.escape(req.body.domainName)},${db.escape(req.body.dnsMappingReq)},${db.escape(req.body.confluenceLink)},${db.escape(req.body.serverAddress)},${db.escape(req.body.operatingSystem)},${db.escape(req.body.portNumber)},${db.escape(req.body.status)})`;
    const queryNone =       `INSERT INTO certificates (userEmail,projectTitle,projectPurpose,revGen,externalUsers,requestType,managerApproval,csrLink,domainName,dnsMappingReq,confluenceLink,serverAddress,operatingSystem,portNumber,status) VALUES (${db.escape(req.body.userEmail)},${db.escape(req.body.projectTitle)},${db.escape(req.body.projectPurpose)},${db.escape(req.body.revGen)},${db.escape(req.body.externalUsers)},${db.escape(req.body.requestType)},${db.escape(req.body.managerApproval)},DEFAULT,${db.escape(req.body.domainName)},${db.escape(req.body.dnsMappingReq)},DEFAULT,${db.escape(req.body.serverAddress)},${db.escape(req.body.operatingSystem)},${db.escape(req.body.portNumber)},${db.escape(req.body.status)})`;
    const queryCSR  =       `INSERT INTO certificates (userEmail,projectTitle,projectPurpose,revGen,externalUsers,requestType,managerApproval,csrLink,domainName,dnsMappingReq,confluenceLink,serverAddress,operatingSystem,portNumber,status) VALUES (${db.escape(req.body.userEmail)},${db.escape(req.body.projectTitle)},${db.escape(req.body.projectPurpose)},${db.escape(req.body.revGen)},${db.escape(req.body.externalUsers)},${db.escape(req.body.requestType)},${db.escape(req.body.managerApproval)},${db.escape(req.body.csrLink)},${db.escape(req.body.domainName)},${db.escape(req.body.dnsMappingReq)},DEFAULT,${db.escape(req.body.serverAddress)},${db.escape(req.body.operatingSystem)},${db.escape(req.body.portNumber)},${db.escape(req.body.status)})`;
    const queryConfluence = `INSERT INTO certificates (userEmail,projectTitle,projectPurpose,revGen,externalUsers,requestType,managerApproval,csrLink,domainName,dnsMappingReq,confluenceLink,serverAddress,operatingSystem,portNumber,status) VALUES (${db.escape(req.body.userEmail)},${db.escape(req.body.projectTitle)},${db.escape(req.body.projectPurpose)},${db.escape(req.body.revGen)},${db.escape(req.body.externalUsers)},${db.escape(req.body.requestType)},${db.escape(req.body.managerApproval)},DEFAULT,${db.escape(req.body.domainName)},${db.escape(req.body.dnsMappingReq)},${db.escape(req.body.confluenceLink)},${db.escape(req.body.serverAddress)},${db.escape(req.body.operatingSystem)},${db.escape(req.body.portNumber)},${db.escape(req.body.status)})`;
    
    if ((csrLink === undefined || csrLink === null) && (confluenceLink === undefined || confluenceLink === null)) {
      try {
        await new Promise((resolve, reject) => {
          db.query(queryNone, (err, result) => {
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
    } else if( (csrLink !== undefined || csrLink !== null) && (confluenceLink === undefined || confluenceLink === null)) {
      try {
        await new Promise((resolve, reject) => {
          db.query(queryCSR, (err, result) => {
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
    }else if( (csrLink === undefined || csrLink === null) && (confluenceLink !== undefined || confluenceLink !== null) ){
      try {
        await new Promise((resolve, reject) => {
          db.query(queryConfluence, (err, result) => {
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
    }else{
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

//Get pending certificates
router.get(
  "/pendingCerts",
  //userMiddleware.isLoggedIn
  async (req, res) => {
    // res.send("Get all users");
    const query = "SELECT * FROM certificates WHERE status = 'pending';";

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

//Get in progress certificates
router.get(
  "/progressCerts",
  //userMiddleware.isLoggedIn,
  async (req, res) => {
    // Query to fetch all certificates with status "pending"
    const query = "SELECT * FROM certificates WHERE status = 'in progress';";

    try {
      await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
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

//Get completed certificates
router.get(
  "/completedCerts",
  //userMiddleware.isLoggedIn,
  async (req, res) => {
    // Query to fetch all certificates with status "pending"
    const query = "SELECT * FROM certificates WHERE status = 'completed';";

    try {
      await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
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

//Completed certs count
router.get("/completedCertsCount", async (req, res) => {
  // Query to fetch the count of certificates with status "completed"
  const query =
    "SELECT COUNT(*) AS Count FROM certificates WHERE status = 'Completed';";

  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          const Count = result[0].Count;

          // Return the count in the response
          return res.status(200).send({
            message: "Success!",
            Count: Count,
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: err,
    });
  }
});

//Pending Certs count
router.get("/pendingCertsCount", async (req, res) => {
  // Query to fetch both the count and data of certificates with status "Pending"
  const query =
    "SELECT COUNT(*) AS Count FROM certificates WHERE status = 'Pending') AS Count FROM certificates WHERE status = 'Pending';";

  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          const Count = result[0].Count;
          const certificateData = result; // The certificate data

          // Return the count and certificate data in the response
          return res.status(200).send({
            message: "Success!",
            Count: Count,
            data: certificateData,
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});


router.get("/inprogressCertsCount", async (req, res) => {
  // Query to fetch the count of certificates with status "completed"
  const query =
    "SELECT COUNT(*) AS Count FROM certificates WHERE status = 'In Progress';";

  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          const Count = result[0].Count;

          // Return the count in the response
          return res.status(200).send({
            message: "Success!",
            Count: Count,
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: err,
    });
  }
});

router.get("/totalCertsCount", async (req, res) => {
  // Query to fetch the count of certificates with status "completed"
  const query = "SELECT COUNT(*) AS Count FROM certificates;";

  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          const Count = result[0].Count;

          // Return the count in the response
          return res.status(200).send({
            message: "Success!",
            Count: Count,
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: err,
    });
  }
});

//Get A Particular user
router.get(
  "/certById/:certificateID",
  // userMiddleware.isLoggedIn,
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
router.put("/updateCerts", async (req, res) => {
  // const certID = req.params.certificateID;

  console.log(req.body);
  const query = `UPDATE certificates SET 
  userEmail = ${db.escape(req.body.userEmail)},
  projectTitle = ${db.escape(req.body.projectTitle)},
  projectPurpose = ${db.escape(req.body.projectPurpose)},
  revGen = ${db.escape(req.body.revGen)},
  externalUsers = ${db.escape(req.body.externalUsers)},
  degEffect = ${db.escape(req.body.degEffect)},
  requestType = ${db.escape(req.body.requestType)},
  managerApproval = ${db.escape(req.body.managerApproval)},
  serverSpecs = ${db.escape(req.body.serverSpecs)},
  domainName = ${db.escape(req.body.domainName)},
  dnsMappingReq = ${db.escape(req.body.dnsMappingReq)},
  wafConfig = ${db.escape(req.body.wafConfig)},
  serverHostname = ${db.escape(req.body.serverHostname)},
  serverAddress = ${db.escape(req.body.serverAddress)},
  operatingSystem = ${db.escape(req.body.operatingSystem)},
  portNumber = ${db.escape(req.body.portNumber)},
  status = ${db.escape(req.body.status)},
  dateRequested = now() 
  where certificateID = ${db.escape(req.body.certificateID)};`;

  // console.log(query);

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
});


//Update Certificate Status
router.patch("/updateCertStatus/:certificateID", async (req, res) => {
  const certificateID = req.params.certificateID; // Assuming you have the certificateID in the request body
  const newStatus = req.body.status; // The new status value to set


  console.log(newStatus); //Not getting value from frontend


  const query = `UPDATE certificates
    SET status = ${db.escape(newStatus)}
    WHERE certificateID = ${db.escape(certificateID)};`;

  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          res.status(400).send({
            message: err,
          });
        } else {
          resolve(result);
          return res.status(200).send({
            message: "Success! Certificate status updated.",
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
});


//Delete Certificate
router.delete(
  "/deleteCert/", //userMiddleware.isLoggedIn,
  (req, res) => {
    const certID = req.body.certificateID;

    console.log(certID);

    const query = `DELETE FROM certificates WHERE certificateID = ? ;`;
    try {
      db.query(query, [certID], (err, result) => {
        if (err) {
          res.status(400).send({
            Message: err,
          });
        } else {
          // resolve(result);
          return res.status(200).send({
            message: "Deleted!",
            data: result,
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  }
);

module.exports = router;
