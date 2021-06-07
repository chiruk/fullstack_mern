import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'


const create = async (req, resp, next) => {
	const user = new User(req.body)
	try{
		await user.save();
		resp.status(200).json({
			message : "You have been saved successfully!"
		})
	}catch (err){
		const message = errorHandler.getErrorMessage(err);
		return res.status(400).json({
			error:errorHandler.getErrorMessage(err)
		})
	}
}

const list = async (req, res, next) => {
	try{
		let users = await User.find().select('name email updated created');
		res.status(200).json(users);
	}catch(exception){
		res.status(400).json({
			error:errorHandler.getErrorMessage(exception)
		});
	}
}

const userById = async (req, res, next, id) => {
	try{
		let user = await User.findById(id);
		if(!user){
			return res.status(400).json({
				error:"User was not found"
			})
		}else{
			req.profile = user;
			next()
		}
	}catch(ex){
		res.status(400).json({
			error:getErrorMessage(ex)
		})
	}
}

const read = (req, res) => {
	try{
		req.profile.hashed_password = undefined
		req.profile.salt = undefined 
		return res.json(req.profile)
	}
}
const update = async (req, res, next) => {
	try{
		let user = extend(req.profile, req.body)
		user.updated = Date.now();
		await user.save()
		user.hashed_password = undefined
		user.salt = undefined
		res.json(user)
	}catch(err){
		res.status(400).json(errorHandler.getErrorMessage(err))
	}
}
const remove = async (req, res, next) => {
	try{
		let user = req.profile
		let deletedUser = await user.remove()

		deletedUser.hashed_password = undefined
		deletedUser.salt = undefined
		res.json(deletedUser)
	}catch(err){
		return res.status(400).json({
			error:errorHandler.getErrorMessage(err)
		})
	}
}


export default {create, userById, read, list, remove, update}

// lodash is a array manipulation anf a bunch of other helper libraries that we could be useing 