import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from 'src/auth/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstanst.secret, 
      signOptions: { expiresIn: jwtConstanst.expirationTime },
    }),
    PassportModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
