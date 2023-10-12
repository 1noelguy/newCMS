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
router.put("", userMiddleware.isLoggedIn, (req, res)=>{

});

//Delete User
router.delete("", userMiddleware.isLoggedIn, (req, res)=>{

});



module.exports = router;