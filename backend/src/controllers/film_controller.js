const connection =  require('../database/connection')
const schema =  require('../schemas/film_schema')
const Joi = require('joi');


module.exports = {

  async create(request, response) {
    try {
      const value = await schema.filmSchema.validateAsync(request.body, { abortEarly: false }, {"context": {"method": "post"}}); 
      await connection('film').insert(value)
      return response.status(200).json({message: "Film created"})
    } catch (error) {
      return response.status(404).json({message: error})
    }
   },

  async update(request, response) {
    const {id} = request.params;
    const changes = request.body;

    try {
      const value = await schema.filmSchema.validateAsync(changes, { abortEarly: false }, {"context": {"method": "put"}});
      const count = await connection('film').where({id}).update(value);
      if (count) {
        response.status(200).json({message: `Film with id ${id} updated`})
      } else {
        response.status(404).json({message: "Film not found"})
      }
    } catch (err) {
      response.status(500).json({message: `Error updating Film with id ${id}`, error: err})
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {  
      const result = await connection('film').where('id', id).del()
      if (result) {
        response.status(200).json({message: `Film with id ${id} deleted`})
      } else {
        response.status(404).json({message: "Film does not exists"})
      }
    } catch (err) {
      response.status(500).json({message: `Film deleting Badge with id ${id}`, error: err})
    }
  },

  async index(request, response) {
    const page = request.query.page;
    
    return connection("film").paginate({ perPage: 10, currentPage: page })
    .then(results => {
      response.status(200).json({results: results})
    })
  },

  async show(request, response) {
    const { id } = request.params;
    
    try {
      const result = await connection("film").where('id', id)
      response.status(200).json({results: result})

    } catch(error){
      response.status(404).json({message: "Problem retrieving film"})
    }
  }
}