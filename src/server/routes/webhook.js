uconst express = require("express");

let router = express.Router();



var webhook = new require("../controllers/webhook/index.js");
var mywebhook = new webhook();

// GET /webhook
router.get("/",mywebhook.verify);

//POST /webhook

router.post("/",mywebhook.checkPost);




module.exports = router;
