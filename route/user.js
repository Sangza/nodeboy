const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const mongoose = express('mongoose');
const {Users, validatorUsers} = require('../model/user');

router.get('/me', auth, async(req,res)=>{
  const user = await Users.findById(req.user._id).select('-password');
  res.send(user);
})

router.post('/', async (req,res) => {
    const { error } = validatorUsers(req.body)
    if (error) {
     res.status(400).send(error);
     return
    }

   let user = await Users.findOne({email: req.body.email});
   if(user) return res.status(400).send('user already exist');


    user = new Users({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
    }
 )

 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password,salt);

  await user.save();
  
const token = user.generateAuthtoken()
res.header('x-auth-token',token).send(_.pick(user,['name', 'email']));
})
module.exports = router;