'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// definiendo el esquema inicial
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Definimos una ruta que ejecutara el middleware
app.use('/api', gqlMiddleware({
// Objeto como parametro del Middleware
  schema: schema, // Esquema a ejecutar
  rootValue: resolvers, // Resolvers que ejecutara
  graphiql: true // Entorno de desarrollo que usaremos
}))

// Se define un metodo listen que escuchara los cambios
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
