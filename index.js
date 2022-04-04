const express = require("express")
const bodyparser = require("body-parser");
const request = require("request");
let app = express();
let token="EAAWzl46ZCT0kBAFuRkZCB9tjTFV6hFjK3Ol0hlvWwR5UUrCa0Xu3YQJyc6SoGLFkfSHKIjXl9VDMgQevZC9ZCo6ODqZCID3gl6RpZANnsbcJPm54U4cSxnkrCNaZCZA8AG4mILDhebHcmFSFNKZClzcotnjMZCRU6JHpdiKQBwuSrq0HMnEXZBce9I9";
let verify_token = "shiroinvolveinnovationmind";
app.use(bodyparser.urlencoded({extended:true}));
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
			
			// Gets the body of the webhook event
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
			
			
			// Get the sender PSID
			let sender_psid = webhook_event.sender.id;
			console.log('Sender PSID: ' + sender_psid);
			
			// Check if the event is a message or postback and
			// pass the event to the appropriate handler function
			if (webhook_event.message) {
				handleMessage(sender_psid, webhook_event.message);        
			} 
			
		});
		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
	
	
});



function handleMessage(sender_psid, received_message) {
	
	let response;
	
	// Check if the message contains text
	if (received_message.text) {    
		
		// Create the payload for a basic text message
		response = {
			"text": `You sent the message: "${received_message.text}". Now send me an image!`
		}
	}  
	
	// Sends the response message
	callSendAPI(sender_psid, response);    
}

function callSendAPI(sender_psid, response) {
	// Construct the message body
	let request_body = {
		"recipient": {
			"id": sender_psid
		},
		"message": response
	}
	
	// Send the HTTP request to the Messenger Platform
	request({
		"uri": "https://graph.facebook.com/v2.6/me/messages",
		 "qs": { "access_token": token },
		 "method": "POST",
		 "json": request_body
	}, (err, res, body) => {
		if (!err) {
			console.log('message sent!')
		} else {
			console.error("Unable to send message:" + err);
		}
	}); 
}

app.listen(process.env.PORT||8080,function(err){
	if(err) throw err;
		   console.log(`Server starting at port ${process.env.PORT||8080}`);
});
