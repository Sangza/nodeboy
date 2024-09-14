const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
 
const userSchema = new mongoose.Schema({
    name: {
      type:String,
      required: true
    },
    email: {
      type:String,
      required: true
    },
    password: {
      type:String,
      required: true
    },
    isAdmin: Boolean
  })
  userSchema.methods.generateAuthtoken = function(){
   const token =  jwt.sign({
      _id:this._id,
      isAdmin: this.isAdmin,
    },
    config.get('jwtPrivateKey')

  )
  return token;
  }
  const Users = mongoose.model('Users', userSchema)

  function validatorUsers(user){
    const schema = Joi.object({
        name:Joi.string().min(5).required(),
       email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().min(5).max(1024).required()
        })
 return schema.validate(user);
}

  exports.Users = Users;
  exports.validatorUsers = validatorUsers;