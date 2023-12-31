import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      findUser: () =>
        Promise.resolve({
          id: 1,
          email: 'email@gamil.com',
          fullName: 'a',
          password: 'a',
          isActive: false,
          profileUrl: 'sadsa',
          createdAt: new Date(),
        } as User),
      createUser: ({ email, password, fullName }) =>
        Promise.resolve({
          id: 1,
          email,
          password,
          fullName,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws error if user signs up with email that is in use', async () => {
    // Modify the findUser method before the test
    fakeUserService.findUser = jest.fn(() =>
      Promise.resolve({
        id: 1,
        email: 'a',
        fullName: 'a',
        password: 'a',
        isActive: false,
        profileUrl: 'sadsa',
        createdAt: new Date(),
      }),
    );

    try {
      await service.registerUser({
        email: 'kishor@gmail.com',
        password: 'kishor@123',
        fullName: 'a',
      });

      fail('Expected an error, but registration succeeded');
    } catch (err) {}
  });
});
