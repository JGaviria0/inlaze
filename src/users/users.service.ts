import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRespo: Repository<User>
  ) { }

  findAll() {
    return this.userRespo.find(); 
  }

  findOne(id: string) {
    return this.userRespo.findOne({where: {id : Number(id)}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRespo.findOne({where: {id : id}});
    this.userRespo.merge(user, updateUserDto); 
    user.updated_at = new Date(); 
    return this.userRespo.save(user); 
  }

  async remove(id: number) {
    const user = await this.userRespo.findOne({where: {id : id}});
    user.updated_at = new Date(); 
    user.is_deleted = true; 
    return this.userRespo.save(user); 
  }
}
