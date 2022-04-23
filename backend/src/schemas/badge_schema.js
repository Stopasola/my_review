const Joi = require('joi');


const badgeSchema = Joi.when(Joi.ref("$method"), {
    "is": "post",
    "then": Joi.object().keys({
        title: Joi.string().lowercase().trim().required(),
        url_img: Joi.string().uri().label("url_img").required().allow(''),
        weight: Joi.number().min(0).max(5).integer().required(),
        description: Joi.string().max(240)
    }),
    "otherwise": Joi.object().keys({
        title: Joi.string().lowercase().trim(),
        url_img: Joi.string().uri().label("url_img").allow(''),
        weight: Joi.number().min(0).max(5).integer(),
        description: Joi.string().max(240)
    })
});


module.exports = {
    badgeSchema
};
    

