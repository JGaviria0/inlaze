import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from './../auth/jwt.auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

jest.mock('./roles.service');

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('RolesController', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: JwtAuthGuard,
          useValue: mockJwtAuthGuard,
        },
      ],
    }).compile();

    rolesController = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const createRoleDto: CreateRoleDto = {
        is_deleted: false,
        name: 'Test Role',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const createdRole = {
        id: 10,
        is_deleted: false,
        name: 'Test Role',
        created_at: new Date(),
        updated_at: new Date(),
      }; // Your expected created role object
      
      jest.spyOn(rolesService, 'create').mockResolvedValue(createdRole);

      expect(await rolesController.create(createRoleDto)).toBe(createdRole);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const result = []; // Your expected array of roles
      
      jest.spyOn(rolesService, 'findAll').mockResolvedValue(result);

      expect(await rolesController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a role', async () => {
      const roleId = '1';
      const role = {
        id: 10,
        is_deleted: false,
        name: 'Test Role',
        created_at: new Date(),
        updated_at: new Date(),
      }; 
      
      jest.spyOn(rolesService, 'findOne').mockResolvedValue(role);

      expect(await rolesController.findOne(roleId)).toBe(role);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const roleId = '1';
      const updateRoleDto: UpdateRoleDto = {
        name: 'Updated Role',
        updated_at: new Date(),
      };
      const updatedRole = {
        id: 10,
        is_deleted: false,
        name: 'Test Role',
        created_at: new Date(),
        updated_at: new Date(),
      }; 
      
      jest.spyOn(rolesService, 'update').mockResolvedValue(updatedRole);

      expect(await rolesController.update(roleId, updateRoleDto)).toBe(updatedRole);
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const roleId = '1';
      const removedRole = {
        id: 1,
        is_deleted: true,
        name: 'Test Role',
        created_at: new Date(),
        updated_at: new Date(),
      }; 
      
      jest.spyOn(rolesService, 'remove').mockResolvedValue(removedRole);

      expect(await rolesController.remove(roleId)).toBe(removedRole);
    });
  });
});
