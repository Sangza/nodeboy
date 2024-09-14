const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.send([1,2,3]);
})

router.get('/', (req,res)=>{
    res.send(req.query)
})

//handling a get request 
router.get('/:id', (req,res)=> {
 const coursee =   course.find(c => c.id == parseInt(req.params.id));
 if(!coursee) res.status(404).send('this course is not found');
 res.send(coursee);
})

//handling a http request for posting
router.post('/', (req,res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error);
        return;
    }
    const coursee = {
        id: course.length + 1,
        name : req.body.name
    }
    course.push(coursee);
    res.send(course);
})
//handling a http request for updating 
router.put('/:id', (req, res)=> {
    const coursee = course.find(c => c.id === parseInt(req.params.id))
    if(!coursee) res.status(404).send('The course withnthe given ID was not found')

    const { error } = validateCourse(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    coursee.name = req.body.name;
    res.send(coursee);
        
})
router.delete('/:id',(req, res)=> {
    const coursee = course.find(c => c.id === parseInt(req.params.id))
    if(!coursee) res.status(404).send('The course with the given ID was not found')

    const index = course.indexOf(coursee);
    course.splice(index,1);

    res.send(course);
})
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course); // Use the validate method
}

module.exports = router;