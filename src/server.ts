import * as express from 'express'
import Db from './db'

const bodyParser = require('body-parser');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
const { makeExecutableSchema } = require('graphql-tools');

const app = express()
const db = new Db()

app.get('/', async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello, from Express with TypeScript' })
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
  Query: { users: (doc: any, args: any, { db }: ContextType) => db.models.User.findAll() },
  Mutation: {
    createUser(root: any, { name, age }: { name: string, age: number }, context: ContextType) {
      return db.models.User.create({ name, age })
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
