import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { IAuthorizedUserRequest } from '../auth/types';
import { AddOrDeleteFavoriteDto } from './dto/add-favorite';
import { SongsService } from '../songs/songs.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { scryptHash, scryptVerify } from 'src/auth/utils/cryptography';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly rolesService: RolesService,
    private readonly songsService: SongsService,
  ) {}

  private async saveUser(user: UserEntity) {
    await this.users.save(user);
    return { message: 'success' };
  }

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
      .loadAllRelationIds({ relations })
      .getOne();
    // .leftJoinAndSelect('user.favorites', 'favorites')
    // .leftJoinAndSelect('user.playlists', 'playlists')
    // .leftJoinAndSelect('user.roles', 'roles')
    // .addSelect('favorites.file')
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
    return this.saveUser(user);
  }

  async removeFavorite(
    req: IAuthorizedUserRequest,
    dto: AddOrDeleteFavoriteDto,
  ) {
    const user = await this.findUserById(req.user.id, ['favorites']);
    user.favorites = user.favorites.filter(
      (favorite) => favorite.id !== dto.songId,
    );
    return this.saveUser(user);
  }

  async update(req: IAuthorizedUserRequest, userDto: UpdateUserDto) {
    const user = await this.findUserByEmail(req.user.email);
    //Request error check
    if (!user) throw new BadRequestException('user_not_found');
    if (userDto.password && !userDto.newPassword)
      throw new BadRequestException('new_password_is_empty');
    if (!userDto.password && userDto.newPassword)
      throw new BadRequestException('old_password_is_empty');

    if (userDto.password && userDto.newPassword) {
      const passwordEquals = await scryptVerify(
        userDto.password,
        user.password,
      );
      if (!passwordEquals)
        throw new BadRequestException('old_password_is_incorrect');
    }

    //Valid request
    if (userDto.name) {
      user.name = userDto.name;
    }

    if (userDto.newPassword) {
      user.password = await scryptHash(userDto.newPassword);
    }

    return this.saveUser(user);
  }
}
