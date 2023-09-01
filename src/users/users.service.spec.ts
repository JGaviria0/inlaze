import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockusers: User[]= [
        { id: 1, full_name: 'User 1', email: 'user1@example.com', password: 'password1', is_deleted: false, created_at: new Date(), updated_at: new Date() },
        { id: 2, full_name: 'User 2', email: 'user2@example.com', password: 'password2', is_deleted: false, created_at: new Date(), updated_at: new Date() }
      ];
      userRepo.find = jest.fn().mockResolvedValue(mockusers);

      const result = await userService.findAll();

      expect(result).toEqual(mockusers);
    });
  });


  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const userMock: User = { id: 1, full_name: 'User 1', email: 'user1@example.com', password: 'password1', is_deleted: false, created_at: new Date(), updated_at: new Date() };
      userRepo.findOne = jest.fn().mockResolvedValue(userMock);

      const result = await userService.findOne(String(userId));

      expect(result).toBe(userMock);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });

  describe('update', () => {
    it('should update a User', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { full_name: 'new User name' }

      const olduser: User = {
        id: 1, 
        full_name: 'old User name', 
        email: 'user1@example.com', 
        password: 'password1', 
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      const mocktosave: User = {
        id: 1, 
        full_name: 'new User name', 
        email: 'user1@example.com', 
        password: 'password1', 
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      userRepo.findOne = jest.fn().mockResolvedValue(olduser);
      userRepo.save = jest.fn().mockResolvedValue(mocktosave);
      userRepo.merge = jest.fn().mockResolvedValue(mocktosave);

      const result = await userService.update(userId, updateUserDto);

      expect(result).toBe(mocktosave);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });

  describe('remove', () => {
    it('should mark a user as deleted', async () => {
      const userid = 1;
      const mockuser: User = { 
        id: 1, 
        full_name: 'user 1', 
        password: 'password', 
        email: 'user1@email.com',
        is_deleted: false, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      userRepo.findOne = jest.fn().mockResolvedValue(mockuser);
      mockuser.is_deleted = true; 
      userRepo.save = jest.fn().mockResolvedValue(mockuser);

      const result = await userService.remove(userid);

      expect(result).toBe(mockuser);
      expect(mockuser.is_deleted).toBe(true);
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: userid } });
      expect(userRepo.save).toHaveBeenCalledWith(mockuser);
    });
  });

  
});
