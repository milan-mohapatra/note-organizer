import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  public async signUp(@Body() body: CreateUserDto) {
    const newUser = await this.authService.createNewUser(body);
    return {
      statusCode: 201,
      message: 'New user created successfully',
      data: newUser,
    };
  }

  // POST /auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async logIn(@Body() body: LoginUserDto) {
    const response = await this.authService.userLogin(body);
    return {
      statusCode: 200,
      message: 'User login successful',
      data: response,
    };
  }
}
