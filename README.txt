
asdf install nodejs latest && asdf install yarn latest

node -v v17.7.1

Step 1 - Install node.js
Step 2 - Install npm and yarn 
Step 3 - npm install

* Rodar uma migration
knex migrate:latest

* Criar uma tabela

knex migrate:make create_people


Passo a passo para instalar as dependencias do projeto.
Para a execução do projeto é necessário iniciar o servidor do backend e o servidor de front end simultaneamente.
A porta que o servidor está rodadando é a 3333.

Para a criação da entidade Person por exemplo, deve enviar uma requisição POST para a rota: http://localhost:3333/createusers
e o seguinte conteudo em json

{
	"full_name": "Fernando Stopasola Vieira",
	"nickname": "stopasola",
  "email": "fernando.stopasola@gmail.com",
  "gender": "Male",
  "birthdate": "15-01-1998",
  "password": "batatafrita",
  "description": "Movies S2",
  "created_at": "09-01-2021"
}

No file routes.js é possível observar todas as rotas implementadas no sistema.
