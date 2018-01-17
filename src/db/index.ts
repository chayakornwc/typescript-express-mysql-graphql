
import {Sequelize} from 'sequelize-typescript';
import User from './models/User'


export class Db {
  sequelize: Sequelize
  User = User
  constructor() {
    this.sequelize =  new Sequelize({
      database: 'ts-test',
      dialect: 'mysql',
      username: 'root',
      password: '',
      modelPaths: [__dirname + '/models']
    })
  }

  sync() {
    this.sequelize.authenticate().then(() => {
      this.sequelize.sync()
    })
  }
}

export default new Db()
