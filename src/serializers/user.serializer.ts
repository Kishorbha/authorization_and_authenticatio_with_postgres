import { Expose } from 'class-transformer';

export class UserSerializer {
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  isActive: boolean;

  @Expose()
  profileUrl: string;
}
