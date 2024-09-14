const express = require('express');
const router = express.Router();

router.get('/' ,(req,res)=>{
    res.render('index', {title:'Hashirama', name:'Getting into Data is necessary'})
    });


router.get('/', (req, res ) => {
        res.send('Getting into Data is necessary')
    })
    
module.exports = router;