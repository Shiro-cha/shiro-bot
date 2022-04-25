const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


//init app 

var app = express();


//set body parser middelware 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//set static folder 

app.use(express.static(path.join(__dirname,"static")));

//set routes

 const webhook = require("./routes/webhook");
 
 app.use("/webhook",webhook);



//launch server
const port =process.env.PORT||8080; 
app.listen(port,function(err){
	
	if (err) throw err;
	console.log(`server start at port ${port}`);
	
});
