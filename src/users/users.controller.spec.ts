import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

jest.mock('./users.service'); 

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: JwtAuthGuard,
          useValue: mockJwtAuthGuard,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        { id: 1, full_name: 'User 1', email: 'user1@example.com', password: 'password1', is_deleted: false, created_at: new Date(), updated_at: new Date() },
        { id: 2, full_name: 'User 2', email: 'user2@example.com', password: 'password2', is_deleted: false, created_at: new Date(), updated_at: new Date() }
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);
  
      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = '1';
      const user: User = { id: 1, full_name: 'User 1', email: 'user1@example.com', password: 'password1', is_deleted: false, created_at: new Date(), updated_at: new Date() };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
  
      expect(await userController.findOne(userId)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserDto = { full_name: 'Updated User' };
      const updatedUser: User = { 
        id: 1, 
        full_name: 'Updated User', 
        email: 'user1@example.com', 
        password: 'password1', 
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser);
  
      expect(await userController.update(userId, updateUserDto)).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '1';
      const deletedUser: User = { id: 1, full_name: 'User 1', email: 'user1@example.com', password: 'password1', is_deleted: true, created_at: new Date(), updated_at: new Date() };
      jest.spyOn(usersService, 'remove').mockResolvedValue(deletedUser);
  
      expect(await userController.remove(userId)).toBe(deletedUser);
    });
  });
});
