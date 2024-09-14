const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const mongoose = express('mongoose');
const {Users} = require('../model/user');


router.post('/', async (req,res) => {
    const { error } = validateAuth(req.body)
    if (error) return res.status(400).send(error);

   let user = await Users.findOne({email: req.body.email});
   if(!user) return res.status(400).send('invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password');


const token = user.generateAuthtoken();
  res.send(token);
})

function validateAuth(req){
    const schema = Joi.object({
       email: Joi.string().required(),
        password:Joi.string().min(5).max(1024).required()
        })
 return schema.validate(req);
}

module.exports = router;
