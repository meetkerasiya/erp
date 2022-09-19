const express=require('express');
const auth = require('./middleware/auth');
const app=express();
const Joi=require('joi');
const jwt=require("jsonwebtoken");
const config=require("config");
const registration=require("./routes/registration");
const login=require("./routes/login");
const profile=require("./routes/create_profile");
const bodyParser=require("body-parser");
const addpaper=require("./routes/add_paper");
const getpaper=require("./routes/get_paper");
const addbook=require("./routes/add_book");
const addevent=require("./routes/add_event");
const add_expert_talk=require("./routes/add_expert_talk");
const add_faculty_workshop=require("./routes/add_faculty_workshop");
const addgrant=require("./routes/add_grant");
const addpatent=require("./routes/add_patent");
const addphd=require("./routes/add_phd");
const addrnd=require("./routes/add_research_dev");
const addtour=require("./routes/add_study_tour");
const addwork=require("./routes/add_work");
const getevent=require("./routes/get_event");
const getbook=require("./routes/get_book");
const get_expert_talk=require("./routes/get_expert_talk");
const get_faculty_workshop=require("./routes/get_faculty_workshop");
const getgrant=require("./routes/get_grant");
const getpatent=require("./routes/get_patent");
const getphd=require("./routes/get_phd");
const getrnd=require("./routes/get_reserch_dev");
const gettour=require("./routes/get_study_tour");
const getwork=require("./routes/get_work");


var cors = require('cors')
app.use(cors())
//cors
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
 

if(!config.get("jwtPrivateKey"))
{
    console.log("Json web token cannot be signed without private key, so set it up");
    process.exit(1);
}
require("./startup/db_connect")();
 
app.use("/registration",registration);
app.use("/login",login);
app.use("/profile",profile);
app.use("/addpaper",addpaper);
app.use("/getpaper",getpaper);
app.use("/addbook",addbook);
app.use("/getbook",getbook);
app.use("/addevent",addevent);
app.use("/getevent",getevent);
app.use("/add_expert_talk",add_expert_talk);
app.use("/get_expert_talk",get_expert_talk);
app.use("/add_faculty_workshop",add_faculty_workshop);
app.use("/get_faculty_workshop",get_faculty_workshop);
app.use("/addgrant",addgrant);
app.use("/getgrant",getgrant);
app.use("/addpatent",addpatent);
app.use("/getpatent",getpatent);
app.use("/addphd",addphd);
app.use("/getphd",getphd);
app.use("/addrnd",addrnd);
app.use("/gerrnd",getrnd);
app.use("/addtour",addtour);
app.use("/gettour",gettour);
app.use("/addwork",addwork);
app.use("/getwork",getwork);

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
};
app.post("/post", cors(corsOptions),(req, res) => {
  res.header('Access-Control-Allow-Origin' , "*")
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  console.log(req.body.username+" "+req.body.password);
    console.log("Connected to React");
  });

//react response
app.get('/dashboard', (req, res) => {
  res.send({ token: req.cookies['response'] });
});
    
const port=8080; 
app.listen(port); 
