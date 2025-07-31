import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  public async signUp(@Body() body: CreateUserDto) {
    const newUser = await this.userService.createNewUser(body);
    return {
      statusCode: 201,
      message: 'New user created successfully',
      data: newUser,
    };
  }
}
