const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

//Get All users
router.get("/", userMiddleware.isLoggedIn, async (req, res)=>{
    // res.send("Get all users");
    console.log(isLoggedIn)
    const query = "SELECT * FROM users;";

    try {
        await new Promise ((resolve, reject)=>{
            db.query(query, (err,result)=>{
                if (err) {
                    // reject(new Error(err.message));
                    return res.status(400).send({
                        message: err,
                    }); 
                }else{

                    resolve(result);
                    return res.status(200).send({
                        message: "Success!",
                        data: result
                    });
    
                }
            });
        })
        // return response;
        
    } catch (error) {
        console.log(error);
    }
});

//Get A Particular user
router.get("/userById/:userID", userMiddleware.isLoggedIn, async (req, res)=>{
    const userID = req.params.userID;
    // console.log(userID);

    const query = `SELECT * FROM users WHERE userID= ? ;`;

    try {
        await new Promise((resolve, reject)=>{
        db.query(query, [userID],(err, result)=>{
            if (err) {
                return res.status(400).send({
                    message: err,
                });   
            }else{
                resolve(result);
                return res.status(200).send({
                    message: "Success!",
                    data: result
                });
            }
        })
    });
    } catch (error) {
        return res.status(400).send({
            message: err,
        });
    }
    
});

//Update user
router.put("/updateUser/", //userMiddleware.isLoggedIn, 
(req, res)=>{

});

//Delete User
router.delete("/deleteUser/", //userMiddleware.isLoggedIn, 
(req, res)=>{
    const userID = req.body.userID;

    const query = `DELETE FROM users WHERE userID = ? ;`;

    try {
        db.query(query,[userID], (err, result)=>{
            if (err) {
                return res.status(400).send({
                    message: err,
                });  
            } else {
                return res.status(200).send({
                    message: "Deleted!",
                    data: result
                });
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: err,
        });
    }

});



module.exports = router;