import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { LocalAuthGuard } from '../../../guards/local.guard';
import { Request } from 'express';
import { UserWithTokens } from '../../../serializers/user-with-token.serializer';
import { UserSerializer } from '../../../serializers/user.serializer';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateUserDto) {
    return plainToInstance(
      UserSerializer,
      await this.authService.registerUser(createAuthDto),
      {
        strategy: 'excludeAll',
      },
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }: Request) {
    return plainToInstance(
      UserWithTokens,
      await this.userService.userLogin(user),
      { strategy: 'excludeAll' },
    );
  }
}
