import mongoose from 'mongoose'


const UserSchema = new mongoose.UserSchema({
	name : {
		type : String,
		trim : true, 
		required : 'Name is required'
	}, 
	email : {
		type : String, 
		trim : true, 
		unique : "Email allready exists",
		match : [/.+\@.+\..+/, 'Please fill a valid email address'],
		required : 'Email is reuqired'
	},
	created : {
		type: Date, 
		default: Date.now
	},
	updated : Date,
	hashed_password : {
		type : String, 
		required : "Password is required"
	},
	salt : String
});

UserSchema.virtual('password').set(function password(password){
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password)
}).get(function(){
	return this._password;
});

UerSchema.methods = {
	authenticate : function(password){
		return this.hashed_password === encryptPassword(password)
	},
	encryptPassword : function(password){
		if(!password){
			return '';
		}

		try{
			return crypto.Hmac('sha1', this.salt).update(password).digest('hex')
		}catch(err){
			return ''
		}
	},
	makeSalt : function(password){
		return Math.round((new Date().valueOf() * Math.random())) + ''
	}
}

UserSchema.path('hashed_password').validate(function(v){
	if(this._password && this._password.length < 6){
		this.invalidate('password', 'Password must be at least 6 characters.');
	}
	if(this.isNew && !this._password){
		this.invalidate('password', 'Password is required')
	}
}, null);

export default UserSchema;