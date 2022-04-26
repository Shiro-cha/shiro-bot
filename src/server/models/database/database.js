const mongoose = require("mongoose");
const config = require("../../../../config/access_env.js");

class Database{
	
	connect(){
		mongoose.connect(`mongodb://localhost:27017/Shiro_bot`);
		mongoose.connection.once("open",function(){
			console.log("connexion success ,now firework...")
		}).on("error",function(err){
			console.log(err);
		});
	}
	
}

module.exports = Database;


