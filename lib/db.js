var mysql = require('mysql');

const dotenv    =   require("dotenv");
dotenv.config();
let instance = null;

const connection    =   mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});


module.exports = connection;