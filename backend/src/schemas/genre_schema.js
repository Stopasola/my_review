const Joi = require('joi');

const genreSchema = Joi.when(Joi.ref("$method"), {
    "is": "post",
    "then": Joi.object().keys({
        name: Joi.string().lowercase().trim().required().valid('action', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'thriller'),
        description: Joi.string().max(300)
    }),
    "otherwise": Joi.object().keys({
        name: Joi.string().lowercase().trim().valid('action', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'thriller'),
        description: Joi.string().max(300)
    })
});

module.exports = {
    genreSchema
};
    

