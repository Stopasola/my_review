const connection =  require('../database/connection')

module.exports = {

  async create(request, response) {
    const {weight, title, description, url_img} = request.body;
    try {
      var found = await connection('badge').where({title: title}).count('id')
      if (Number(found[0]['count']) > 0){
        return response.status(404).json({message: "An badge with this title already exists."})
      }else if(Number(weight) > 5 || Number(weight) < 0){
        return response.status(404).json({message: "The weight must be between 0 and 5."})
      } else {
        await connection('badge').insert({ weight, title, description, url_img})
        return response.status(200).json({message: "Badge created"})
      }
    } catch (err) {
      response.status(500).json({message: "Error creating new badge", error: err})
    }
  },

  async update(request, response) {
    const {id} = request.params;
    const changes = request.body;

    try {
      const count = await connection('badge').where({id}).update(changes);
      if (count) {
        response.status(200).json({message: `Badge with id ${id} updated`})
      } else {
        response.status(404).json({message: "Badge not found"})
      }
    } catch (err) {
      response.status(500).json({message: `Error updating Badge with id ${id}`, error: err})
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {  
      const result = await connection('badge').where('id', id).del()
      if (result) {
        response.status(200).json({message: `Badge with id ${id} deleted`})
      } else {
        response.status(404).json({message: "Badge does not exists"})
      }
    } catch (err) {
      response.status(500).json({message: `Error deleting Badge with id ${id}`, error: err})
    }
  },

  async index(request, response) {
    const page = request.query.page;
    
    return connection("badge").paginate({ perPage: 10, currentPage: page })
    .then(results => {
      response.status(200).json({results: results})
    })
  },

  async show(request, response) {
    const { id } = request.params;
    
    try {
      const result = await connection("badge").where('id', id)
      response.status(200).json({results: result})

    } catch(error){
      response.status(404).json({message: "Problem retrieving badge"})
    }
  }

}