const jwt = require('jsonwebtoken');
const db = require("../lib/db.js");

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    
    if (token) {
        jwt.verify(token, "SECRETKEY", (err, decodedToken)=>{
            if (err) {
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/');
    }
}


//check the current user

const checkUser = (req, res, next ) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "SECRETKEY", async(err, decodedToken)=>{
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                await db.query(`select * from users where userID = ${db.escape(decodedToken.userID)}`, (err, result)=>{
                        if (err) {
                            console.log(err);
                            next();
                        }else{
                            res.locals.user = result
                            next();
                        }
                    });

                
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports={requireAuth, checkUser };