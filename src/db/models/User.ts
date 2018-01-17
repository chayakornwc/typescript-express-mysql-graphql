import {Table, Column, Model, HasMany, PrimaryKey} from 'sequelize-typescript'

@Table({
  timestamps: true,
  version: true
})
export default class User extends Model<User> {

  @Column
  name: string

  @Column
  age: number
}
