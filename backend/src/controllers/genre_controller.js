const connection =  require('../database/connection')
const schema =  require('../schemas/genre_schema')

module.exports = {

  async create(request, response) {
    try {
      const value = await schema.genreSchema.validateAsync(request.body, { abortEarly: false }, {"context": {"method": "post"}}); 

      var found = await connection('genre').where({name: value["name"]})
      if (found.length) { return response.status(404).json({message: "An genre with this title already exists."}) }
      await connection('genre').insert(value)
      return response.status(200).json({message: "Genre created"})
    } catch (error) {
      console.log('erro')
      return response.status(404).json({message: error})
    }
  },

//   async update(request, response) {
//     const {id} = request.params;
//     const changes = request.body;

//     try {
//       const value = await schema.badgeSchema.validateAsync(changes, { abortEarly: false }, {"context": {"method": "put"}});
//       const count = await connection('badge').where({id}).update(value);
//       if (count) {
//         response.status(200).json({message: `Badge with id ${id} updated`})
//       } else {
//         response.status(404).json({message: "Badge not found"})
//       }
//     } catch (err) {
//       response.status(500).json({message: `Error updating Badge with id ${id}`, error: err})
//     }
//   },

//   async delete(request, response) {
//     const { id } = request.params;

//     try {  
//       const result = await connection('badge').where('id', id).del()
//       if (result) {
//         response.status(200).json({message: `Badge with id ${id} deleted`})
//       } else {
//         response.status(404).json({message: "Badge does not exists"})
//       }
//     } catch (err) {
//       response.status(500).json({message: `Error deleting Badge with id ${id}`, error: err})
//     }
//   },

//   async index(request, response) {
//     const page = request.query.page;
    
//     return connection("badge").paginate({ perPage: 10, currentPage: page })
//     .then(results => {
//       response.status(200).json({results: results})
//     })
//   },

//   async show(request, response) {
//     const { id } = request.params;
    
//     try {
//       const result = await connection("badge").where('id', id)
//       response.status(200).json({results: result})

//     } catch(error){
//       response.status(404).json({message: "Problem retrieving badge"})
//     }
//   }

}