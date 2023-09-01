import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResgisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import exp from 'constants';

const mockJwtService = {
  sign: () => 'mockedToken',
};


describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerDto: ResgisterAuthDto = {
        full_name: 'user1',
        email: 'user@email.com',
        password: 'password',
        is_deleted: false, 
        created_at: new Date(),
        updated_at: new Date()
      };
      const mockSavedUser = {} as User;
      userRepository.save = jest.fn().mockResolvedValue(mockSavedUser);
      userRepository.findOne = jest.fn().mockResolvedValue( null );

      const result = await authService.register(registerDto);
      
      expect(result).toBe(mockSavedUser);
    });

    it('should throw an error if user already exists', async () => {
      const registerDto: ResgisterAuthDto = {
        full_name: 'user1',
        password: 'password',
        email: 'user@email.com',
        is_deleted: false, 
        created_at: new Date(),
        updated_at: new Date()
      };

      const found: ResgisterAuthDto = {
        full_name: 'user1',
        email: 'user@email.com',
        password: 'password',
        is_deleted: false, 
        created_at: new Date(),
        updated_at: new Date()
      };
      userRepository.findOne = jest.fn().mockResolvedValue(found);
      userRepository.save = jest.fn().mockResolvedValue(null);

      try{
        const result = await authService.register(registerDto);
      } catch(e) {
        expect(e).toBeInstanceOf(HttpException);
      }
      expect(userRepository.save).not.toHaveBeenCalled(); 
    });
  }); 

  describe('login', () => {
    it('should login a user', async () => {
      // Arrange
      const loginDto: LoginAuthDto = {
        email: 'user@email.com',
        password: '87654321'
      };
      const mockUser = { id: 1, email: 'test@example.com', password: '$2b$10$gg9dVmGFytYsmibT1aKDd.lsdYyAZZUPARySZ0jTm2HH/XpE0P4vC' } as User;
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await authService.login(loginDto);

      expect(result).toBeDefined();
      expect(result.token).toBe('mockedToken');
      expect(result.user).toBe(mockUser);
    });

    it('should throw an error if user not found', async () => {
      const loginDto: LoginAuthDto = {
        email: 'user@email.com',
        password: '87654321'
      };

      userRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(HttpException);
    });

    it('should throw an error if password is incorrect', async () => {
      // Arrange
      const loginDto: LoginAuthDto = {
        email: 'user@email.com',
        password: '87654321'
      };
      const mockUser = { id: 1, email: 'test@example.com', password: 'IncorrectPassword' } as User;
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      await expect(authService.login(loginDto)).rejects.toThrow(HttpException);
    });
  });
});
