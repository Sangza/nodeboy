const admin = require('../middleware/admin');
const auth = require('../middleware/auth')
const express = require('express');
const { default: modules } = require('underscore/modules/index.js');
const route = express.Router();
const { Genres } = require('../model/genre');



route.get('/', async (req,res) => {
    const genres = await Genres.find().sort('name');
    res.send(genres)
})

route.get('/:id',async (req,res) => {
 const genre = await Genres.findById(req.params.id)
 if(!genre) res.status(404).send('The genre for this id was not found');
 res.send(genre);
})

route.post('/',auth, async (req,res) => {
   const { error } = validateCourse(req.body)
   if (error) {
    res.status(400).send(error);
    return
   }
   let genre = new Genres({
    name: req.body.name
   }
)
try {
    const genres = await genre.save();
   res.send(genres);
} catch (error) {
    console.log(error.message);
}
})

route.put('/:id', async (req,res) => {
    const { error } = validateCourse(req.body);
    if (error) {
    const result = res.status(400).send(error);
    return result;
    }

    const genree = await Genres.updateOne({_id:req.params.id},
        {
           $set:{
            name: req.body.name
           }
        },{
            new:true
        }
        )
    if(!genree) res.status(404).send('This id could not be found in the genres')
    res.send(genree);
    
})

route.delete('/:id',[auth, admin],async (req, res)=>{
    const genree =await Genres.deleteOne({_id:req.params.id});
    if(!genree) res.status(404).send('This id could not be found in the genres')
    res.send(genree);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course); // Use the validate method
}

module.exports = route;