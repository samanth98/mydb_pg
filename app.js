const express = require("express");
var app = express();
const { Client } = require("pg"); //module - postgres
var port = process.env.PORT || 9999;

const client = new Client({
  host: "ec2-54-235-98-1.compute-1.amazonaws.com",
  database: "df06q9hndin750",
  port: 5432,
  user: "zvvtdqllkttmoy",
  password: "71e58f7cc5a532a61400e203138a806ffc0c24aa9f5a3093d5e3b1aec81d6f8e",
  ssl :{
      rejectUnauthorized: false
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("err n server");
  }
  console.log("server started at :", port);
});
//connect
client.connect();
app.get("/", function (req, res) {
  res.send("Welcome To DataBase Application !");
});

app.get("/createdb", function (req, res) {
  //create a new table
  var sql =
    "create table subject( name varchar(200), maxmark int, color varchar(100) ) ";
  client.query(sql, function (err, result) {
    if (err) {
      res.send("err in table creation");
      return;
    }
    res.send("Table created successfully");
  });
});
app.get("/adddata", function (req, res) {
  //inserting data into the table subject
  var query =
    "insert into subject (name, maxmark, color) values ('Social', '200', 'Yellow') ";
  client.query(query, function (err, result) {
    if (err) {
      res.send("err in inserting");
      return;
    }
    res.send("Row inserted successfully");
  });
});

app.get("/getdata",function(req,res){
    //selecting the data from the table subject
var selectQuery = "select * from subject";
client.query(selectQuery, function (err, result) {
  if (err) {
    res.send("Err in select query");
    return;
  }
  var htmlContent = ""
  if (result.rowCount > 0) {
    //console.log("Result : ", result.rows)
    for (var tempRow of result.rows) {
        htmlContent = htmlContent + tempRow.name+ "</br> ";
    }
    res.send(htmlContent)
  } else {
    res.send("error in selected data ")
    return
  }
})
})


