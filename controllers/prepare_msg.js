const request = require("request");
const shiro_response = require("./shiro_response.js");
const access_env = require("../config/access_env.js");


module.exports = function(){
		this.handleMessage = function(sender_psid, received_message,token) {
		
		let response;
		
		// Check if the message contains text
		if (received_message.text) {    
			
			//set the response to the message
			
			response = shiro_response.text;
			console.log(response);
			
		}  
		
		// Sends the response message
		callSendAPI(sender_psid,response,token);    
	}
	
	function callSendAPI(sender_psid,response , token) {
		// Construct the message body
		let request_body = {
			"recipient": {
				"id": sender_psid
			},
			"messaging_type":"RESPONSE",
			"message": {
				"text":response
				
			}
		}
		
		// Send the HTTP request to the Messenger Platform
		request({
			"uri": "https://graph.facebook.com/v13.0/me/messages",
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
