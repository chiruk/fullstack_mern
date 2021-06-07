import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'


const signin = (req, res, next) => {
	let user = User.findOne({"email" : req.body.email})
	if(!user){
		return res.status(400).send("The username is incorrect")
	}

	if(!user.authenticate(req.body.password)){
		return res.status(401).send("The username or password is incorrect")
	}

	const token = jwt.sign({_id : user._id}, config.jwtSecret)
	config.cookie('t', token, {expire : Date.now() + 9999})

	return res.json({
		token, 
		user : {
			_id : user._id,
			name : user.name,
			email : user.email
		}
	})
}

const signout = (req, res, next) => {
	res.clearCookie("t")
	return res.status("200").json({
		message:"signed out"
	})
}

const requiresSignin = expressJwt({
	secret : config.jwtSecret, 
	userProperty : "auth"
})

const hasAuthorization = (req, res, next) => {
	const authorization = req.profile && req.auth && req.auth._id == req.profile._id
	if(!authorization){
		res.status(403).send("User does not have the proper authorization for this action")
	}
	next()
}


export default {signin, signout, requiresSignin, hasAuthorization}
