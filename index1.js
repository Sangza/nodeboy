const mongoose = require('mongoose');
const express = require('express');
const genre = require('./route/genre');
const customer = require('./route/customer')
const auth = require('./route/auth');
const app = express();
const users = require('./route/user');
const config = require('config');

if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwt is not defined");
    process.exit(1);
}

//we are adding a piece of middleware using this. 
//app.use using this middleware in the request processing pipeline
app.use(express.json());
app.use('/api/genres', genre);
app.use('/api/customer',customer);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('connecting to db.....'))
//set a port 
const port = process.env.PORT || 3000;
//listen to a port 
app.listen(port,()=> console.log('listening on this port .....', port))