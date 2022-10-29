import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { IAuthorizedUserRequest } from '../auth/types';
import { AddOrDeleteFavoriteDto } from './dto/add-favorite';
import { SongsService } from '../songs/songs.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly rolesService: RolesService,
    private readonly songsService: SongsService,
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

  async findAll(name?: string, page?: number) {
    const usersLimit = 50;

    //TODO code repetition
    const users = this.users.createQueryBuilder().select();
    if (name) users.where(`name ILIKE :name`, { name: `%${name}%` });

    const items = users
      .limit(usersLimit)
      .offset(usersLimit * page)
      .loadAllRelationIds({ relations: ['roles'] })
      .getMany();

    return items;
  }

  async findUserByEmail(email: string, relations = ['roles']) {
    const user = await this.users
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      // .leftJoinAndSelect('user.favorites', 'favorites')
      // .leftJoinAndSelect('user.playlists', 'playlists')
      // .leftJoinAndSelect('user.roles', 'roles')
      // .addSelect('favorites.file')
      .loadAllRelationIds({ relations })
      .getOne();
    // console.log({ user });
    /*.findOne({
      where: { email },
      relations: ['roles'],
    })*/

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

  async findUserById(id: number, relations = ['roles', 'playlists']) {
    const user = await this.users.findOne({
      where: { id },
      relations,
    });
    return user;
  }

  async addFavorite(req: IAuthorizedUserRequest, dto: AddOrDeleteFavoriteDto) {
    const user = await this.findUserById(req.user.id, ['favorites']);
    const song = await this.songsService.findById(true, dto.songId);
    user.favorites.push(song);
    await this.users.save(user);
    return { message: 'success' };
  }

  async removeFavorite(
    req: IAuthorizedUserRequest,
    dto: AddOrDeleteFavoriteDto,
  ) {
    const user = await this.findUserById(req.user.id, ['favorites']);
    user.favorites = user.favorites.filter(
      (favorite) => favorite.id !== dto.songId,
    );
    await this.users.save(user);
    return { message: 'success' };
  }
}
