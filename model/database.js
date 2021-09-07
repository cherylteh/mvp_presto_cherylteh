require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "presto",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  //this needs to be amended to reflect PRESTO
  let sql =
    "DROP TABLE if exists transaction; Drop CREATE TABLE transaction (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,date DATE, particular VARCHAR(500), folio VARCHAR(400), debit_RM INT, credit_RM INT, total_RM INT);";
    
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `students` was successful!");

    console.log("Closing...");
  });

  con.end();
});


// CREATE TABLE songlib (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(100) not null, composer VARCHAR(100), parts VARCHAR(30), PRIMARY KEY (id));
// CREATE TABLE event (id INT NOT NULL AUTO_INCREMENT, eventName VARCHAR(100) not null, location VARCHAR(100), date DATE, PRIMARY KEY (id));
