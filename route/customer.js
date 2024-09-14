const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const { Customers, validate}= require('../model/customers');


route.get('/',async (req,res)=> {
const cust = await Customers.find().sort('name');
if(!cust)  res.status(400).send('Please nothing is here....')
res.send(cust);
})

route.get('/:id',async (req,res)=>{
const cust = await Customers.findById(req.params.id);
if(!cust) res.status(400).send('Please this id does not exist')
    res.send(cust)
})

route.post('/', async (req,res) => {
    const { error } = validate(req.body)
    if (error){
        res.status(400).send(error);
        return;
    }

    const customer = new Customers({
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    })
      try {
        const result = await customer.save();
        res.send(result)
      } catch (error) {
        console.log(error.message);
      }
})

route.put('/:id',async (req,res)=>{
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error)
        return;
    }
    const cust = await Customers.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone,
        }
    },{
       new:true
    })
    if(!cust) res.status(400).send('Check the id...hope it is correct')
    res.send(cust);
})

route.delete('/:id', async (req,res)=>{
    const cust = await Customers.deleteOne({_id:req.params.id})
    if(!cust) res.status(400).send('check the id... hope it is correct')
    res.send(cust);
})


module.exports = route;