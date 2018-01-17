import * as express from 'express'
import db from './db'
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

app.listen(3000, () => console.log('App listening on port 3000'))
