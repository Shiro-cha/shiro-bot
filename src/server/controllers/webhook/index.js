 const access_env = require("../../../../config/access_env.js");
 const prepare_msg = require("../prepare_msg.js");

 
 class Webhook{
	
	verify(req,res){
		
		if(req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === access_env.verify_token){
			console.log("Validation webhook");
			res.status(200).send(res.send(req.query["hub.challenge"]));
		}else{
			console.error("Failed validation . Make sure the validation token match");
			res.sendStatus(403);
		}
		
		
		
	}
	checkPost(req,res){
		
		let body = req.body;
		let message = new prepare_msg();
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
	}
	
	
}


module.exports = Webhook;
