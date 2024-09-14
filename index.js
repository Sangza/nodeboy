const debug = require('debug')('app:startup')
const config = require('config');
const morgan = require('morgan')
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger')
const app = express();
const home = require('./route/home');
const course = require('./route/course');


//using environment=
// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`)


//Templating engine : for generating dynamic html and returning it to the client;
app.set('view engine', 'pug');
app.set('views', './views');

//we are adding a piece of middleware using this. 
//app.use using this middleware in the request processing pipeline
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(helmet());
app.use('/',home);
app.use('/api/course', course); 
//configuration 
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'))

if (app.get('env') === "development") {
    app.use(morgan('tiny'));
    //debugger
    debug('Mogan enabled....')
}

//db debugger
// dbDebugger('Best fit');


app.use(logger);




// to help you set a port from env
const port = process.env.PORT || 3000
//listen to the port on the web to help locate your data
app.listen(port, ()=> console.log(`listening to this in port ${port}....`))

