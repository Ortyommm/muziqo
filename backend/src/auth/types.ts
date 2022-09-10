import { RoleEntity } from '../roles/entities/user.entity';
import { Request } from 'express';

export interface IUserPayload {
  email: string;
  id: number;
  roles: RoleEntity[];
}

export type IAuthorizedUserRequest = Request & { user: IUserPayload };
