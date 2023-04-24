import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const list = await this.usersRepository.find();
    if (list.length === 0) {
      throw new NotFoundException('list is empty');
    }
    return list;
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async findByName(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async create(dto: UserDto): Promise<any> {
    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return { message: 'user created' };
  }
  async update(id: number, dto: UserDto): Promise<any> {
    const user = await this.findById(id);
    const updatedUser = Object.assign(user, dto);
    await this.usersRepository.save(updatedUser);
    return { message: 'user updated' };
  }
  async delete(id: number): Promise<any> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
    return { message: 'user deleted' };
  }
}
