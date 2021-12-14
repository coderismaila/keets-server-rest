import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const dto = {
    email: 'ismailah28@gmail.com',
    username: 'ismailah28',
    password: 'hascom1227',
    staffId: '103193',
  };

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now().toLocaleString(),
        ...dto,
      };
    }),
    findUsers: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  describe('create user', () => {
    it('should create a user', () => {
      expect(userController.create(dto)).toEqual({
        id: expect.any(String),
        ...dto,
      });

      expect(mockUserService.create).toHaveBeenCalled();
    });
  });
  describe('get user', () => {
    it('get all users', () => {
      expect(userController.findUsers()).toEqual([]);
    });
  });
});
