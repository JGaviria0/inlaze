import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from 'src/auth/jwt.constants';
import { Role } from './entities/role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role]),
    JwtModule.register({
      secret: jwtConstanst.secret, 
      signOptions: { expiresIn: jwtConstanst.expirationTime },
    }),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
