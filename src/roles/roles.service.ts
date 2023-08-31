import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private roleRespo: Repository<Role>
  ) { }
  
  create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRespo.create(createRoleDto); 
    return this.roleRespo.save(newRole);
  }
  
  findAll() {
    return this.roleRespo.find(); 
  }

  findOne(id: number) {
    return this.roleRespo.findOne({where: {id : Number(id)}});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const user = await this.roleRespo.findOne({where: {id : id}});
    this.roleRespo.merge(user, updateRoleDto); 
    user.updated_at = new Date(); 
    return this.roleRespo.save(user);
  }

  async remove(id: number) {
    const user = await this.roleRespo.findOne({where: {id : id}});
    user.updated_at = new Date(); 
    user.is_deleted = true; 
    return this.roleRespo.save(user);
  }
}
