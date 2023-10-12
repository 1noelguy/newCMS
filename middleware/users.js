const jwt = require("jsonwebtoken");

module.exports = {
    validateRegister: (req, res, next)=> {
        //username min length
        if (!req.body.username || req.body.username.length < 3) {
            // console.log(req.body.username);
            return res.status(400).send({
                message: "Please enter a username of minimum 3 characters",
            });
        }
        //password min 6 charaters
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message:"Please enter a password of 6 characters minimum",
            });
        }

        //Repeat password match checker
        if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
            return res.status(400).send({
                message: "Both passwords must match",
            });
        }
        next();
    },
    isLoggedIn: (req, res, next)=>{
        if (!req.headers.authorization) {
            return res.status(400).send({
                message: "Session is invalid",
            });
        }

        try {
            const authHeader = req.headers.authorization;
            console.log(authHeader);
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token , "SECRETKEY");
            req.useData = decoded;
            next();
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                message: "Session is invalid"
            });
        }
    },
}