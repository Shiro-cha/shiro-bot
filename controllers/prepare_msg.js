const request = require("request");
const shiro_response = require("./shiro_response.js");


module.export = function(){
		this.handleMessage = function(sender_psid, received_message,token) {
		
		let response;
		
		// Check if the message contains text
		if (received_message.text) {    
			
			//set the response to the message
			
			response = shiro_response.text;
			
		}  
		
		// Sends the response message
		this.callSendAPI(sender_psid, response,token);    
	}
	this.callSendAPI = function(sender_psid, response) {
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
	
} 
