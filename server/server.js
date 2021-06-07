import app from "./express.js"
import config from "./config/config.js"
import mongoose from 'mongoose'
import Template from "../template.js"

mongoose.connect(config.mongoUri, {
	useNewUriParser: true, 
	useCreateIndex : true, 
	useUnifiedTopology : true
});

mongoose.connect.on('error', ()=>{
	console.log(`Unable to connect to mongoose ${mongoUri}`)
});

app.listen(config.port, (err) => {
	if(err){
		confole.log(err);
	}else{
		console.log(`Server has been started on port : ${config.port}`)
	}
});

app.get("/", (req, resp){
	resp.status(200).send(Template())
});

