const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const jwt = require("jsonwebtoken");

router.post("/addComment", (req, res) => {
  let token = req.cookies.jwt;
  let comment = req.body.comment;
  let certificateID = req.body.certificateID;
  let commentor = null;

  jwt.verify(token, "SECRETKEY", (err, decodedToken) => {
    if (err) {
      return res.status(400).send({
        message: "Kindly log In to proceed",
      });
    } else {
      commentor = decodedToken.username;
    }
  });

  try {
    db.query(
      `INSERT INTO comments (comment, commentor, certificateID) VALUES (${db.escape(
        comment
      )}, ${db.escape(commentor)}, ${db.escape(certificateID)})`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send({
            message: "An Error Occurred executing the query!",
          });
        } else {
          console.log(result);
          return res.status(200).send({
            message: "Comment Added!",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/getComments/:certificateID", (req, res) => {
  let certID = req.params.certificateID;
  console.log(certID);
  let query = `SELECT * FROM comments WHERE certificateID = ${db.escape(certID)} order by date;`;

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: "An Error Occured While Executing Query",
        });
      } else {
        console.log(result);
        return res.status(200).send({
          message: "success!",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }
});

router.delete("/delComment", async (req, res) => {
  let commentID = req.body.commentID;

  let query = `DELETE FROM comments where ID = ?`;
  try {
    await new Promise((resolve, reject) => {
      db.query(query, [commentID], (err, result) => {
        if (err) {
          reject("Failed");
          return res.status(400).send({
            message: "Error Executing delete Query",
          });
        } else {
          resolve("Completed!");
          return res.status(200).send({
            message: "Comment Deleted",
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
});

module.exports = router;
