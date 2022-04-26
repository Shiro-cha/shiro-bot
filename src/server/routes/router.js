const  index = require("./index");
const webhook = require("./webhook");


module.exports = function(app){

app.use("/admin",index);
app.use("/webhook",webhook);

}
