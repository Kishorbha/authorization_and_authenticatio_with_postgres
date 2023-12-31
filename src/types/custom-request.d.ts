import { Request } from 'express';
import { User } from 'src/modules/users/entities/user.entity';
Request;

declare module 'express' {
  interface Request {
    user?: User;
  }
}
