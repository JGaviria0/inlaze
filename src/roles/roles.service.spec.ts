import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RolesService', () => {
  let rolesService: RolesService;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const createRoleDto: CreateRoleDto = {
        name: "role1",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      };
      const newRole: Role = {
        id: 1,
        name: "role1",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      roleRepository.create = jest.fn().mockReturnValue(createRoleDto);
      roleRepository.save = jest.fn().mockResolvedValue(newRole);

      const result = await rolesService.create(createRoleDto);

      expect(result).toBe(newRole);
      expect(roleRepository.create).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const mockRoles: Role[]= [
        { id: 1, name: 'Role 1', is_deleted: false, created_at: new Date(), updated_at: new Date },
        { id: 2, name: 'Role 2', is_deleted: false, created_at: new Date(), updated_at: new Date }
      ];
      roleRepository.find = jest.fn().mockResolvedValue(mockRoles);

      const result = await rolesService.findAll();

      expect(result).toEqual(mockRoles);
    });
  });

  describe('findOne', () => {
    it('should return a role by ID', async () => {
      const roleId = 1;
      const mockRole: Role= { id: roleId, name: 'Role 1', is_deleted: false, created_at: new Date(), updated_at: new Date};
      roleRepository.findOne = jest.fn().mockResolvedValue(mockRole);

      const result = await rolesService.findOne(roleId);

      expect(result).toBe(mockRole);
      expect(roleRepository.findOne).toHaveBeenCalledWith({ where: { id: roleId } });
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const roleId = 1;
      const updateRoleDto: UpdateRoleDto = {name: 'Role 2', is_deleted: false };
      const mockRole = {  id: roleId, name: 'Role 1', is_deleted: false, created_at: new Date(), updated_at: new Date} as Role;
      const mocktosave: Role = { id: roleId, name: 'Role 2', is_deleted: false, created_at: new Date(), updated_at: new Date };
      roleRepository.findOne = jest.fn().mockResolvedValue(mockRole);
      roleRepository.save = jest.fn().mockResolvedValue(mocktosave);
      roleRepository.merge = jest.fn().mockResolvedValue(mocktosave);

      const result = await rolesService.update(roleId, updateRoleDto);

      expect(result).toBe(mocktosave);
      expect(roleRepository.findOne).toHaveBeenCalledWith({ where: { id: roleId } });
    });
  });

  describe('remove', () => {
    it('should mark a role as deleted', async () => {
      const roleId = 1;
      const daysago2 = new Date().getDate() - 2; 
      const rightnow = new Date()
      const mockRole: Role = { id: 1, name: 'Role 1', is_deleted: false, created_at: new Date(daysago2), updated_at: new Date(daysago2) };
      const mockRoletosave: Role = { id: 1, name: 'Role 1', is_deleted: false, created_at: new Date(daysago2), updated_at: rightnow };
      roleRepository.findOne = jest.fn().mockResolvedValue(mockRole);
      roleRepository.save = jest.fn().mockResolvedValue(mockRoletosave);

      const result = await rolesService.remove(roleId);

      expect(result).toBe(mockRoletosave);
      expect(mockRole.is_deleted).toBe(true);
      expect(roleRepository.findOne).toHaveBeenCalledWith({ where: { id: roleId } });
      expect(roleRepository.save).toHaveBeenCalledWith(mockRole);
      expect(result.updated_at).toBe(rightnow);
    });
  });
});

