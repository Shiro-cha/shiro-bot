const mongoose = require("mongoose");


let categorySchema = mongoose.Schema({
	name:String,
	slog:String,
	desc:String
});

module.exports = mongoose.model("category",categorySchema);
