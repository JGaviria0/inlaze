import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResgisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  resgisterUser(@Body() userObject: ResgisterAuthDto) { 
    return this.authService.register(userObject);
  }

  @Post('login')
  loginUser(@Body() userObject: LoginAuthDto) { 
    return this.authService.login(userObject);
  }
}
