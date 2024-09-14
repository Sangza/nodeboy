const { default: modules } = require("underscore/modules/index.js");
   
  function log(req, res, next){
        console.log('Logging...')
        next();
        console.log('authenticating....')
        next();
    }

   

module.exports = log;

