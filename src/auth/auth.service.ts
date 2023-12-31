import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResgisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService : JwtService
    ) { }

  async register( userObject: ResgisterAuthDto){
    const  rolecheck = await this.userRepo.findOne({
      where: { email: userObject.email }
    }); 
    if(rolecheck) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.NOT_ACCEPTABLE)
    const { password } = userObject; 
    const hashpassword = await hash(password, 10); 
    userObject = {...userObject, password: hashpassword}; 
    return this.userRepo.save(userObject); 
  }

  async login( userObject: LoginAuthDto){
    const { email, password } = userObject;
    const findUser = await this.userRepo.findOne({
      where: { email: email}
    })
    if(!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    
    const checkPassword = await compare(password, findUser.password); 
    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN); 

    const payload = { id: findUser.id, name: findUser.full_name}; 
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser, 
      token
    }
    return data; 
  }
}
