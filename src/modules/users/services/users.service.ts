import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';
import { hashPassword } from '../../../utils/helpers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const password = await hashPassword(userDetails.password);
    const params = { ...userDetails, password };
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }

  async userLogin(userDetails: User) {
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshTokens(userDetails);

    if (!accessToken || !refreshToken)
      throw new BadRequestException(`Could't generate tokens`);

    return { accessToken, refreshToken, ...userDetails };
  }

  async findUser(params: FindUserParams): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: params.email },
    });

    return user || null;
  }

  async generateAccessAndRefreshTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        {
          secret: this.configService.get('app.jwtSecret'),
          expiresIn: this.configService.get('app.accessTokenExpiry'),
        },
      ),
      this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        {
          secret: this.configService.get('app.jwtRefresh'),
          expiresIn: this.configService.get('app.refreshTokenExpiry'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
