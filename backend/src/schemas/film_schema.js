const Joi = require('joi');


const filmSchema =  Joi.when(Joi.ref("$method"), {
    "is": "post",
    "then": Joi.object().keys({
        full_name: Joi.string().lowercase().trim().required(),
        rotten_tomatoes_score: Joi.number().min(0).max(100),
        imdb_score: Joi.number().min(0.0).max(10.0),
        release_date: Joi.date().less('now'),
        budget: Joi.number().greater(0),
        trailer_url: Joi.string().uri().label("trailer_url").required().allow(''),
        poster_url: Joi.string().uri().label("poster_url").required().allow(''),
        age_group: Joi.number().integer(),
        synopsis: Joi.string().max(300),
        runtime: Joi.number().integer(),
        language : Joi.string().lowercase().trim(),
        country : Joi.string().lowercase().trim()
    }),
    "otherwise": Joi.object().keys({
        full_name: Joi.string().lowercase().trim(),
        rotten_tomatoes_score: Joi.number().min(0).max(100),
        imdb_score: Joi.number().min(0.0).max(10.0),
        release_date: Joi.date().less('now'),
        budget: Joi.number().greater(0),
        trailer_url: Joi.string().uri().label("trailer_url").allow(''),
        poster_url: Joi.string().uri().label("poster_url").allow(''),
        age_group: Joi.number().integer(),
        synopsis: Joi.string().max(300),
        runtime: Joi.number().integer(),
        language : Joi.string().lowercase().trim(),
        country : Joi.string().lowercase().trim()
    })
});


module.exports = {
   filmSchema
};