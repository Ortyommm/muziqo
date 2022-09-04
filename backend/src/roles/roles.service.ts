import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roles: Repository<RoleEntity>,
  ) {}

  async create(dto: CreateRoleDto) {
    const role = Object.assign(new RoleEntity(), dto);
    return !!(await this.roles.insert(role));
  }

  async findRoleByValue(value: string) {
    return this.roles.findOneBy({ value });
  }
}
