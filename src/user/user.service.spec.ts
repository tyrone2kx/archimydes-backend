import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { RolesEnum, User } from './schemas/user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  const mockUserModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const createUserDto = {
    name: 'Tyrone',
    email: 'tyrone@gmail.com',
    role: RolesEnum.ADMIN,
  };

  const mockCreatedUser = {
    /* mock the created user */
    _id: '61c0ccf11d7bf83d153d7c06',
    ...createUserDto,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with valid input', async () => {
      jest
        .spyOn(userModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockCreatedUser as any))
        .mockResolvedValue(mockCreatedUser as any);

      const result = await service.create(createUserDto);

      expect(userModel.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockCreatedUser);
    });

    it('should throw an error with invalid input', async () => {
      jest.spyOn(userModel, 'create').mockRejectedValue(BadRequestException);

      await expect(
        service.create({ ...createUserDto, role: 'asdad' as RolesEnum }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should throw an error when user not found', async () => {
      jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockRejectedValue(NotFoundException);

      await expect(service.update('x', createUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update a user with valid input', async () => {
      const updatedUser = { ...mockCreatedUser, name: 'Jones' };
      const updates = { name: 'Jones' };
      jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedUser as any);
      jest
        .spyOn(userModel, 'findById')
        .mockResolvedValue(mockCreatedUser as any);

      const result = await service.update(updatedUser._id, updates);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        updatedUser._id,
        updates,
      );
      expect(result.name).toEqual(updates.name);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      jest
        .spyOn(userModel, 'findByIdAndDelete')
        .mockResolvedValue(mockCreatedUser as any);

      const result = await service.remove(mockCreatedUser._id);

      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockCreatedUser._id,
      );
      expect(result).toEqual(true);
    });
  });

  describe('findAll', () => {
    it('should return an array of users when users exist', async () => {
      // Mock data for existing users
      const mockUsers = [
        createUserDto,
        { ...createUserDto, email: 'example@gmail.com' },
      ];

      // Mock the find method of userModel to resolve with mockUsers
      jest.spyOn(userModel, 'find').mockResolvedValue(mockUsers);

      // Call the findAll method
      const result = await service.findAll();

      // Assertions
      expect(userModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });

    it('should return an empty array when no users exist', async () => {
      // Mock data for empty array
      const mockEmptyUsers = [];

      // Mock the find method of userModel to resolve with an empty array
      jest.spyOn(userModel, 'find').mockResolvedValue(mockEmptyUsers);

      // Call the findAll method
      const result = await service.findAll();

      // Assertions
      expect(userModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEmptyUsers);
    });
  });
});
