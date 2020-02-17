'use strict'

const { graphql, buildSchema } = require('graphql')
const express = require('express');
const gqlMiddleware = require('express-graphql');

const app = express()
const port = process.env.port || 3000

// definiendo el esquema inicial
const schema = buildSchema(`    
    type Query {
        hello: String
    }
`)

// Configurar los resolvers
const resolvers = {
    hello: () => {
      return 'Hola Mundo'
    }
  }

// Definimos una ruta que ejecutara el middleware 
app.use('/api', gqlMiddleware({
// Objeto como parametro del Middleware
schema: schema, // Esquema a ejecutar
rootValue: resolvers, // Resolvers que ejecutara
graphiql: true // Entorno de desarrollo que usaremos
}))

// Se define un metodo listen que escuchara los cambios
app.listen(port, () => {
console.log(`Server is listening at http://localhost:${port}/api`);
})