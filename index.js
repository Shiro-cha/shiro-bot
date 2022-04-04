const express = require("express")
const bodyparser = require("body-parser");
const http = require("http");
let app = express();
let token = "EAAWzl46ZCT0kBADzl6iw02IkdI61mXeEMUcQgilLb8InB4UwVap2XZC9Eyy1a26dUh0C4qFyHbZAtYP6aw8jFdRhgXP2QZCHzRxvNt9OPB7y4c6wRFUiHb66JFF7ggwH0ZBmjbIlZCpAPlJM1zRSRUse8rDqPhJy0ulb2aGqkGxrDSAfNv7F3g";
let verify_token = "shiroinvolveinnovationmind";
app.use(bodyparser.urlencoded({extends:false}));
app.use(bodyparser.json());

app.get("/",function(req,res){

    res.send("Shiro Bot Application work ;)");

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

app.post("/webhook",function(req,res){

    var data = req.body;
    if(data.object =="page"){
		console.log(data.entry);
        data.entry.forEach(function(pageentry){
            let pageId = pageentry.id;
            let timeout = pageentry.time;
            pageentry.messaging.forEach(function(evt){
                if(evt.message && evt.message.text){

                }
            });
        });
    }

});


function receiving(evt){
    var senderid = evt.sender.id;
    var recipientid = evt.recipient.id
    var timeofmessage = evt.timestamp;
    var message = evt.message.text;
    let text = evt.message.text;
    text = text || "";
    var messageText = `Hello user id:${senderid}`;
    var messagedata = {
        recipient:{id:senderid},
        message:{text:messageText}
    }
    callsendapi(messagedata);
}

function callsendapi(messagedata){
    request({
        url:"graph.facebook.com/v2.6/me/messages",
        qs:{acces_token:token},
        method:"POST",
        json:messagedata
    });
}
var port = process.env.PORT||8080;
app.listen(port,function(){
    console.log(`App is running at port ${port}...`);
});

