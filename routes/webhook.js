const express = require("express");
const access_env = require("../config/access_env.js");
const prepare_msg = require("../controllers/prepare_msg.js");

let router = express.Router();
let message = new prepare_msg();

// GET /webhook
console.log(message);
router.get("/",function(req,res){
	
	if(req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === access_env.verify_token){
		console.log("Validation webhook");
		res.status(200).send(res.send(req.query["hub.challenge"]));
	}else{
		console.error("Failed validation . Make sure the validation token match");
		res.sendStatus(403);
	}
	
});

//POST /webhook

router.post("/",function(req,res){
	
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
				
				message.handleMessage(sender_psid, webhook_event.message,access_env.token_facebook);        
			} 
			
		});
		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
	
});




module.exports = router;
