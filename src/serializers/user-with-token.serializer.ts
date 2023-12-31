import { Expose } from 'class-transformer';
import { UserSerializer } from './user.serializer';

export class UserWithTokens extends UserSerializer {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
