const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

//view engine
app.set("views", "./views");
app.set("view engine", "ejs");

const auth = require("./routes/router.js");
const users = require("./routes/users.js");
const cert = require("./routes/certificates.js");
const { requireAuth, checkUser } = require("./middleware/authmid.js");

//middleware for all endpoits
app.get("*", checkUser);

//render views
app.get("/", (req, res) => res.render("signIn"));
app.get("/user_page", requireAuth, (req, res) => res.render("users"));
app.get("/request_page", requireAuth, (req, res) => res.render("request_page"));
app.get("/home", requireAuth, (req, res) => res.render("home"));
app.get("/certificates_page", requireAuth, (req, res) =>
  res.render("certificates")
);

//Backend
app.use("/api", auth);
app.use("/users", users);
app.use("/certs", cert);

app.listen(PORT, () => console.log(`server is runnig on ` + PORT));
