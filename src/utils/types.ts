import { Request } from 'express';
import { User } from 'src/modules/users/entities/user.entity';

export type CreateUserDetails = {
  email: string;
  password: string;
  fullName: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  fullName: string;
}>;

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type AccessParams = {
  id: number;
  userId: number;
};
