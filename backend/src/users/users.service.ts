import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = Object.assign(new UserEntity(), dto);
    const role = await this.rolesService.findRoleByValue('USER');

    try {
      !!(await this.users.insert(user));
      user.roles = [role];
      return this.users.save(user);
    } catch (error) {
      // console.log(error.constructor);
      throw new HttpException(error, 400);
    }
  }

  async findAll() {
    return this.users.find({ relations: ['roles'] });
  }

  async findUserByEmail(email: string) {
    const user = await this.users.findOne({
      where: { email },
      relations: ['roles'],
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.users.findOne({
      where: { id: dto.userId },
      relations: ['roles'],
    });
    const role = await this.rolesService.findRoleByValue(dto.value);

    if (role && user) {
      user.roles.push(role);
      await this.users.save(user);
      return dto;
    }

    throw new HttpException('user_or_role_not_found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(dto: DeleteUserDto) {
    const user = await this.users.findOne({
      where: { id: dto.userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    await this.users.remove(user);
    return { message: 'success' };
  }
}
