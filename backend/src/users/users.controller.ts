import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { IAuthorizedUserRequest } from '../auth/types';
import { AddOrDeleteFavoriteDto } from './dto/add-favorite';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('name') name?: string, @Query('page') page?: string) {
    return this.usersService.findAll(name, +page);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  findByRequest(@Req() req: IAuthorizedUserRequest) {
    return this.usersService.findUserById(req.user.id, [
      'roles',
      'favorites',
      'favorites.authors',
      'playlists',
    ]);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: number) {
    return this.usersService.findUserById(id, [
      'roles',
      'favorites',
      'playlists',
    ]);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/favorite')
  addFavorite(
    @Req() req: IAuthorizedUserRequest,
    @Body() dto: AddOrDeleteFavoriteDto,
  ) {
    return this.usersService.addFavorite(req, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/favorite')
  removeFavorite(
    @Req() req: IAuthorizedUserRequest,
    @Body() dto: AddOrDeleteFavoriteDto,
  ) {
    return this.usersService.removeFavorite(req, dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete()
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
