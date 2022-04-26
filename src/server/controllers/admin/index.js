
class Admin{
	
	get_page(req,res){
		res.send("welcom to admin area");
	}
	
}

module.exports = new Admin();
