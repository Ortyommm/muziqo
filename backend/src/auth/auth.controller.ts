import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RequestResetPasswordDto } from '../users/dto/request-reset-password.dto';
import { TryResetPasswordDto } from '../users/dto/try-reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('request-reset-password')
  resetPassword(@Body() userDto: RequestResetPasswordDto) {
    return this.authService.requestResetPassword(userDto);
  }

  @Post('try-reset-password')
  tryResetPassword(@Body() userDto: TryResetPasswordDto) {
    return this.authService.resetPassword(userDto);
  }
}
