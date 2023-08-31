import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResgisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService : JwtService
    ) { }

  async register( userObject: ResgisterAuthDto){
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
    if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    
    const checkPassword = await compare(password, findUser.password); 
    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403); 

    const payload = { id: findUser.id, name: findUser.full_name}; 
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser, 
      token
    }
    return data; 
  }
}
