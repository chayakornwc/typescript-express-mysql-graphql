
import { Sequelize } from 'sequelize-typescript';
import User from './models/User'
import config from '../config'

class Models {
  static User = User
}

export default class Db {
  sequelize: Sequelize
  models = Models
  
  constructor() {
    this.sequelize =  new Sequelize({
      database: config.MYSQL_DATABASE,
      dialect: 'mysql',
      username: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      host: config.MYSQL_HOST,
      modelPaths: [__dirname + '/models']
    })
    this.sequelize.authenticate().catch((e) => {
      console.error(e)
      process.exit(1)
    })
  }

  sync() {
    this.sequelize.authenticate().then(() => {
      this.sequelize.sync()
    })
  }
}
