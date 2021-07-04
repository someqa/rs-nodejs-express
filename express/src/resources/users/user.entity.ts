import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('text')
  name = 'name';

  @Column({type:'text', unique: true})
  login = 'user';

  @Column('text')
  password = 'pswrd';

  static toResponse(user: IUser): IUserDTO {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
