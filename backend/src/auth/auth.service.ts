import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { scryptHash, scryptVerify } from './utils/cryptography';
import { UserEntity } from '../users/entities/user.entity';
import { IUserPayload } from './types';
import { RequestResetPasswordDto } from '../users/dto/request-reset-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendMail } from '../utils/mailer';
import { TryResetPasswordDto } from '../users/dto/try-reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    if (!user) return;
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    //For email security
    if (!user) throw new UnauthorizedException('incorrect_email_or_password');
    const passwordEquals = await scryptVerify(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('incorrect_email_or_password');
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (candidate) {
      throw new UnauthorizedException('email_already_exists');
    }
    const hashPassword = await scryptHash(userDto.password);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async requestResetPassword(userDto: RequestResetPasswordDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (!candidate) throw new BadRequestException('user_does_not_exist');
    const resetPassword = crypto.randomBytes(3).join('');
    candidate.resetPassword = await scryptHash(resetPassword);
    candidate.resetPasswordTimestamp = Date.now();
    await this.users.save(candidate);
    await sendMail({
      to: userDto.email,
      text: `Your code to reset password: ${resetPassword}`,
    });
    return { message: 'success' };
  }

  async resetPassword(userDto: TryResetPasswordDto) {
    const candidate = await this.userService.findUserByEmail(userDto.email);
    if (!candidate) throw new BadRequestException('user_does_not_exist');

    // 15 min
    const timeToReset = 1000 * 60 * 15;
    // console.log(Date.now(), candidate.resetPasswordTimestamp, timeToReset);
    if (
      Date.now() - candidate.resetPasswordTimestamp > timeToReset ||
      !candidate.resetPasswordTimestamp
    )
      throw new BadRequestException('time_to_reset_password_expired');
    if (!(await scryptVerify(userDto.tempPassword, candidate.resetPassword)))
      throw new BadRequestException('incorrect_password');

    candidate.password = await scryptHash(userDto.newPassword);
    candidate.resetPasswordTimestamp = null;
    candidate.resetPassword = null;
    await this.users.save(candidate);
    return { message: 'success' };
  }

  // async

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
