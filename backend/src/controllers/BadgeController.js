const connection =  require('../database/connection')

module.exports = {

  async create(request, response) {
    const {weight, title, description} = request.body;

    await connection('badge').insert({
        weight, 
        title, 
        description
    })

    return response.json({ 'status': 'Badge criado' });
  },

  async update(request, response) {
    const { id, field, content } = request.body;

    console.log(field)
    console.log(content)

    await connection('badge')
      .where('id', id)
      .update({
        full_name: content
      })

    return response.json({ 'status': 'Usuário Alterado' });
  },

  async delete(request, response) {
    const { id } = request.body;

    console.log(id)

    await connection('badge')
      .where('id', id)
      .del()

    return response.json({ 'status': 'Badge Deletado' });
  }

}
