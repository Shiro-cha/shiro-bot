const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const database = require("./models/database/database.js");


//init app 

var app = express();

//connect to database

var conn = new database().connect();


//set body parser middelware 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//set static folder 

app.use(express.static(path.join(__dirname,"../../static")));

//set routes

 const routers = require("./routes/router")(app);

//launch server
const port =process.env.PORT||8080; 
app.listen(port,function(err){
	
	if (err) throw err;
	console.log(`server start at port ${port}`);
	
});
