const connection =  require('../database/connection')

module.exports = {

  async create(request, response) {
    const {full_name, age_group, started_at, created_at} = request.body;

    await connection('film').insert({
        full_name, 
        age_group, 
        started_at,  
        created_at
    })

    return response.json({ 'status': 'Filme criado' });
  },

  async update(request, response) {
    const { id, field, content } = request.body;

    console.log(field)
    console.log(content)

    await connection('film')
      .where('id', id)
      .update({
        full_name: content
      })

    return response.json({ 'status': 'Filme Alterado' });
  },

  async delete(request, response) {
    const { id } = request.body;

    console.log(id)

    await connection('film')
      .where('id', id)
      .del()

    return response.json({ 'status': 'Filme Deletado' });
  }

}
