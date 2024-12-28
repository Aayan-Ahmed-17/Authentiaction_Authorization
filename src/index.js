import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const jwtGenratedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0c21lQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHF3NFFDTVl2OWZtenIvTVB4WVhKQy5kcVZHVzVaNmZqWTg0c2FIMzdJQzhTczVHcldsNFBPIiwiaWF0IjoxNzM1MzcxNDI2LCJleHAiOjE3MzUzNzUwMjZ9.7al9ipCkLC1-KVdMImzpIwyyng-GgCKr0YJsYor6aPA";

app.get("/hash-password", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("myPlaintextPassword", salt, function (err, hash) {
      res.cookie("password", hash);
      res.send(hash);
      console.log(hash);
    });
  });
});

app.get("/create-token", (req, res) => {
  let token = jwt.sign(
    {
      email: "itsme@gmail.com",
      password: "$2b$10$qw4QCMYv9fmzr/MPxYXJC.dqVGW5Z6fjY84saH37IC8Ss5GrWl4PO",
    },
    "secret"
  );

  console.log("token ==>", token);
  res.send(token);
});

app.get("/convert-token", (req, res) => {
  jwt.verify(jwtGenratedToken, "secret", function (err, decoded) {
    res.send(decoded);
    console.log(decoded);
  });
});

app.get("/compare-password", (req, res) => {
  bcrypt.compare(
    "myPlaintextPassword",
    "$2b$10$qw4QCMYv9fmzr/MPxYXJC.dqVGW5Z6fjY84saH37IC8Ss5GrWl4PO",
    function (err, result) {
      console.log(result);
      const cookie = req.cookies;
      console.log(cookie);
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
