const express = require("express");
const auth = require("./middleware/auth");
const app = express();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
//cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (!config.get("jwtPrivateKey")) {
  console.log(
    "Json web token cannot be signed without private key, so set it up"
  );
  process.exit(1);
}
require("./startup/db_connect")();
require("./startup/calling_routes")(app);
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.post("/post", cors(corsOptions), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  console.log(req.body.username + " " + req.body.password);
  console.log("Connected to React");
});

//react response
app.get("/dashboard", (req, res) => {
  res.send({ token: req.cookies["response"] });
});

const port = 5000;
app.listen(port);
