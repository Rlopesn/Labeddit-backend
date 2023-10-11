# Labeddit-back

#### O Desafio Labeddit Full Stack da Labenu é a etapa final do bootcamp Web Full Stack, englobando frontend e backend. Foco em criar um app mobile-first, com destaque na construção de uma API e funcionalidades como autenticação e gerenciamento de banco de dados.

## [Link repositótio Front-end](https://github.com/Rlopesn/Labeddit-backend.git)

# Índice
* [Deploy](#Deploy)
* [Requisições (Paths)](#requisições)
* [Exemplo de Requisições](#exemplo-de-requisições)
* [Tetes](#exemplo-testes)
* [Documentação Postman](#documentação-postman)
* [Tecnologias](#tecnoligias)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Pessoa desenvolvedora](#Pessoa-desenvolvedora)

# Link deploy:
https://labeddit-backend-bgaj.onrender.com


# Requisiçoes (Paths)

### Requisições de Usuários

* /users

#### Cadastro de usuário
* /users/signup

#### Login
* /users/login

### Requisições de Post

* /post
#### Editar e Deletar Posts
* /post/:id
#### Like e Dislike
* /post/:id/like

### Requisições de Comentários

* /comments
#### Editar e Deletar Posts
* /comments/:id


# Exemplo de Requisições
### Requisições de usuários

* POST/ users/signup:

```json
{
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzN2Y4ZDBiLTZiODAtNGJlZC1hYzczLTA5OTg4YzliY2IyNiIsIm5hbWUiOiJGdW1hw6dhIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5NzAzNzg1MywiZXhwIjoxNjk3NjQyNjUzfQ.VBOKBsWkmVIshnbSvlWKE1oYK2ukpCG3Tz6GhB2zijk"
}
```

* GET/ users: Retorna todos os usuário cadastrados.
```json
[
    {
        "id": "c4d7e2b1-f67f-4116-9ebf-eca77460750d",
        "name": "Ana Clara",
        "email": "anac@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-10T18:02:39.667Z"
    },
    {
        "id": "af732c35-e8c6-430a-bf56-a88155eeac76",
        "name": "Ana",
        "email": "ana@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-10T19:03:43.339Z"
    },
    {
        "id": "b737d9fc-c14b-430f-8291-2d6f411b6949",
        "name": "Ana",
        "email": "anadds@email.com",
        "role": "NORMAL",
        "createdAt": "2023-10-11T13:54:26.358Z"
    }
]

```

* POST/ login: logar com uma conta cadastrada, gerando token de identificação.
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0ZDdlMmIxLWY2N2YtNDExNi05ZWJmLWVjYTc3NDYwNzUwZCIsIm5hbWUiOiJBbmEgQ2xhcmEiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk3MDMyODAxLCJleHAiOjE2OTc2Mzc2MDF9.5DC7VNO5CIqXhl71T-ijhPtROEmj-Huc93ObAhgNH4M"
}
```
### Requisições de posts

* POST /posts: criaçao de posts, requer validação via token.
```json
Created
```

* GET/ posts: busca de todos os posts, requer validaçãao via token.
```json
[
    {
        "id": "56312652-b7d6-45fd-a564-0911b9d3b656",
        "content": "Um novo dia",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "created_at": "2023-10-11T14:14:14.427Z",
        "updated_at": "2023-10-11T14:14:14.427Z",
        "creator": {
            "id": "6133472d-64b8-4b3a-b81e-04f6b0cea4a4",
            "name": "Rafael lopes"
        }
    }
]
```

* PUT/ posts/:id: editar posts pelo id, requer validaçãao via token.

```json
{
  "message": "Updated"
}
```

* DELETE/ posts/:id: deletar post pelo is, requer validaçãao via token.
```json
{
  "message": "Post deletado."
}
```

* PUT/ posts/:id/like : dar like e dislike em post pelo id, requer validaçãao via token.

```json
OK
```

### Requisições de comentários

* POST/ comments/:id : criação de comentário do post via id, requer validação de token.

```json
Created
```

* GET/ comments: busca por todos os comentários, requer validação de token.

```json
[
    {
        "id": "157eaa9b-6a75-4938-8530-2dd43db7dffb",
        "content": "Sim, um belo dia!",
        "likes": 0,
        "dislikes": 0,
        "created_at": "2023-10-11T14:55:34.029Z",
        "updated_at": "2023-10-11T14:55:34.029Z",
        "creator": {
            "id": "c4d7e2b1-f67f-4116-9ebf-eca77460750d",
            "post_id": "56312652-b7d6-45fd-a564-0911b9d3b656",
            "name": "Ana Clara"
        }
    }
]
```

* PUT/ comments/:id : editar um comentário pelo seu id, requer validação via token.

```json
{
  "message": "Updated"
}
```

* DELETE/ comments/:id : deletar comentário pelo seu id, requer validação via token.

```json
{
  "message": "Post deletado."
}
```

* PUT/ dar like e dislike em comentários pelo id, requer validação via token.

```json
OK
```

# Testes 
![Testes](./tests/img/testes.png)


# Documentação do Postman
https://documenter.getpostman.com/view/26592621/2s9YJjSK8o

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

# 🛠 Tecnologias
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQL](https://learn.microsoft.com/pt-br/sql/?view=sql-server-ver16)
- [SQLite](https://www.sqlite.org/docs.html)
- [Knex.js](https://knexjs.org/guide/)
- [Zod](https://zod.dev/)
- [UUID Generator](https://www.npmjs.com/package/uuid)
- [Dotenv](https://www.dotenv.org/docs/)
- [JWT](https://jwt.io/introduction/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/Rlopesn/Labeddit-backend.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```
# Pessoa desenvolvedora

<img style="width:200px" src="./src/assets/PessoaAutora.png" alt="Rafael, pessoa autora">

### Rafael Lopes Nogueira

<a href="https://www.linkedin.com/in/rafaellopesn/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>



