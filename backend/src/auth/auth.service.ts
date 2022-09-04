import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { scrypt } from 'crypto';
import { scryptHash, scryptVerify } from './utils/cryptography';
import { UserEntity } from '../users/entities/user.entity';
import { IUserPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    const passwordEquals = await scryptVerify(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'incorrect_email_or_password' });
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('email_already_exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await scryptHash(userDto.password);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: UserEntity) {
    const payload: IUserPayload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
