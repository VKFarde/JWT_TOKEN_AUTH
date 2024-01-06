const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const MongoDBCon = require("./config/MongoDBCon");

const userAuth = require("./routes/userAuth");

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connection to  DB
MongoDBCon();

app.use(userAuth);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
