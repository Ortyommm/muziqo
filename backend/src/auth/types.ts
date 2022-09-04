import { RoleEntity } from '../roles/entities/user.entity';

export interface IUserPayload {
  email: string;
  id: number;
  roles: RoleEntity[];
}
