const connection =  require('../database/connection')

module.exports = {

  async create(request, response) {
    const {full_name, nickname, email, gender, birthdate, password, description, created_at} = request.body;

    await connection('person').insert({
        full_name, 
        nickname, 
        email, 
        gender, 
        birthdate, 
        password, 
        description, 
        created_at
    })

    return response.json({ 'status': 'Usuário criado' });
  },

  async update(request, response) {
    const { id, field, content } = request.body;

    console.log(field)
    console.log(content)

    await connection('person')
      .where('id', id)
      .update({
        full_name: content
      })

    return response.json({ 'status': 'Usuário Alterado' });
  },

  async delete(request, response) {
    const { id } = request.body;

    console.log(id)

    await connection('person')
      .where('id', id)
      .del()

    return response.json({ 'status': 'Usuário Deletado' });
  }

}
