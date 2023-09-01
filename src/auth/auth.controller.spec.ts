import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResgisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/users/entities/user.entity';

jest.mock('./auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('resgisterUser', () => {
    it('should register a user', async () => {
      const userObject: ResgisterAuthDto = {
        full_name: 'Updated User', 
        email: 'user1@example.com', 
        password: 'password1', 
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      const registeredUser = {
        id: 1, 
        full_name: 'Updated User', 
        email: 'user1@example.com', 
        password: 'password1', 
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };

      jest.spyOn(authService, 'register').mockResolvedValue(registeredUser);

      expect(await authController.resgisterUser(userObject)).toBe(registeredUser);
    });
  });

  describe('loginUser', () => {
    it('should login a user', async () => {
      const userObject: LoginAuthDto = {
        email: 'user1@example.com', 
        password: 'password1',
      };
      const userLogged: User = {
        is_deleted: false,
        id: 3,
        full_name: "paula",
        email: "user1@example.com",
        password: "$2b$10$IHgON8T2Bzxq.MSV/uO4iuw2AC7QvXB6y5d4bzSjEuU.dkjXSYXxu",
        created_at: new Date(),
        updated_at: new Date()
      }; 
      const loggedInUser = {
        user: userLogged,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6InBhdWxhIiwiaWF0IjoxNjkzNTE1NDAzLCJleHAiOjE2OTM1MTkwMDN9.ic2WtfpfLXUSwm-RXLVLBaec879JUAxa4Es32R9Cc6g"
      };
      jest.spyOn(authService, 'login').mockResolvedValue(loggedInUser);

      expect(await authController.loginUser(userObject)).toBe(loggedInUser);
    });
  });

});
