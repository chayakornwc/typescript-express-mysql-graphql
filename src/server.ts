import * as express from 'express'
import db, { Db } from './db'
const bodyParser = require('body-parser');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
const { makeExecutableSchema } = require('graphql-tools');

const app = express()

app.get('/', async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello, from Express with TypeScript' })
})

app.get('/createUser', async (req: express.Request, res: express.Response) => {
  const user = db.User.build()
  user.name = "Net"
  user.age = 29
  await user.save()
  res.json(user.toJSON())
})


// The GraphQL schema in string form
const typeDefs = `
  type Query { users: [User] }
  type Mutation { createUser(name: String, age: Int): User }
  type User { name: String, age: Int }
`;

type ContextType = {
  db: Db
}

// The resolvers
const resolvers = {
  Query: { users: (doc: any, args: any, { db }: ContextType) => db.User.findAll() },
  Mutation: {
    createUser() {

    }
  }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// The GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { db } })
)

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
