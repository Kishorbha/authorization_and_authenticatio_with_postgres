import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDetails, ValidateUserDetails } from 'src/utils/types';
import { UsersService } from '../../users/services/users.service';
import { compareHash } from '../../../utils/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({
      email: userDetails.email,
    });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordValid = await compareHash(
      userDetails.password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }

  async registerUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userService.findUser({
      email: userDetails.email,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return await this.userService.createUser(userDetails);
  }
}
