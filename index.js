const express = require("express")
const bodyparser = require("body-parser");
const request = require("request");
let app = express();
let token = "EAAWzl46ZCT0kBAFuRkZCB9tjTFV6hFjK3Ol0hlvWwR5UUrCa0Xu3YQJyc6SoGLFkfSHKIjXl9VDMgQevZC9ZCo6ODqZCID3gl6RpZANnsbcJPm54U4cSxnkrCNaZCZA8AG4mILDhebHcmFSFNKZClzcotnjMZCRU6JHpdiKQBwuSrq0HMnEXZBce9I9";
let verify_token = "shiroinvolveinnovationmind";
app.use(bodyparser.urlencoded({extends:false}));
app.use(bodyparser.json());

app.get("/",function(req,res){

    res.send("Tongasoa eto amin'ny Shiro Bot .....");

});

app.get("/webhook" , function(req,res){

    if(req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === verify_token){
        console.log("Validation webhook");
        res.status(200).send(res.send(req.query["hub.challenge"]));
    }else{
        console.error("Failed validation . Make sure the validation token match");
        res.sendStatus(403);
    }

});

app.post('/webhook', (req, res) => {  
	
	let body = req.body;
	
	// Checks this is an event from a page subscription
	if (body.object === 'page') {
		
		// Iterates over each entry - there may be multiple if batched
		body.entry.forEach(function(entry) {
			
			// Gets the message. entry.messaging is an array, but 
			// will only ever contain one message, so we get index 0
			entry.messaging.forEach(function(evt){
				if(evt.message && evt.message.text){
					receiveing(evt);
				}
			});
		});
		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
	
	
});


function receiving(evt){
    var senderid = evt.sender.id;
    var recipientid = evt.recipient.id
    var message = evt.message.text;
    let text = evt.message.text;
    var messageText = `Hello user id:${senderid}`;
    var messagedata = {
        recipient:{id:senderid},
        message:{text:messageText}
    }
    callsendapi(messagedata);
}

function callsendapi(messagedata){
	request({
		uri:"https://graph.facebook.com/v13.0/me/messages",
		 qs:{acces_token:token},
		 method:"POST",
		 json:messagedata
	})
}
var port = process.env.PORT||8080;
app.listen(port,function(){
    console.log(`App is running at port ${port}...`);
});

