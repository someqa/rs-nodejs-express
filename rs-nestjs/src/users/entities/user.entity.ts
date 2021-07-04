import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserDto } from '../dto/user.dto';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('text')
  name = 'name';

  @Column({ type: 'text', unique: true })
  login = 'user';

  @Column('text')
  password = 'pswrd';

  static toResponse(user: User): UserDto {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
