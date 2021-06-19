import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}

export interface IUserDTO {
  id?: string;
  name?: string;
  login?: string;
}
@Entity()
class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;

  constructor(userData: IUser={}) {
    const {
      id = uuid(),
      name = 'USER',
      login = 'user',
      password = 'P@55w0rd',
    } = userData;
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUserDTO {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;