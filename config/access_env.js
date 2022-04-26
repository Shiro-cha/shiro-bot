module.exports = {
	server:{
		db:{
			
			mongodb:{
				
				host:"localhost:27017",
				queryString:"retryWrites=true&w=majority"
			}
			
		},
		port:"8080"
	},
	token_facebook : process.env.key,
	verify_token:"shirobotinnovationcororation"
} 
