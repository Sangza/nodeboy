const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
      type:String,
      required: true
    }
  })
  const Genres = mongoose.model('Genre', genreSchema)

  function validatorGenres(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).required(),
        })
 return schema.validate(customer);
}

  exports.Genres = Genres;
  exports.validatorGenres = validatorGenres;