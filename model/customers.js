const mongoose= require('mongoose');
const Joi = require('joi')
const customerSchema = new mongoose.Schema({
    isGold: {
     type:Boolean,
     default:false
    },
    name:{
     type:String,
     required:true,
     minlength:5,
     maxlength:20
    } ,
    phone:{
     type:String,
     required:true,
     minlength:11
    },
    })
 
 const Customers = mongoose.model('Customer', customerSchema);

 function validatorCust(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).required(),
        phone:Joi.string().min(11).required(),
        isGold:Joi.boolean().required()
        })
 return schema.validate(customer);
}
 exports.Customers = Customers;
 exports.validate = validatorCust;