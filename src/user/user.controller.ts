import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // GET /user
  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return { statusCode: 200, data: users };
  }

  // GET /user/:userId
  @Get(':userId')
  async getUser(@Param('userId') userId: any) {
    const user = await this.userService.getUserById(userId);
    return { statusCode: 200, data: user };
  }

  // PATCH /user/:userId
  @Patch(':userId')
  async updateUser(@Body() body: UpdateUserDto, @Param('userId') userId: any) {
    const updatedUser = await this.userService.updateUserById(body, userId);
    return {
      statusCode: 200,
      message: 'user updated successfully',
      data: updatedUser,
    };
  }

  // DELETE /user/:userId
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: any) {
    await this.userService.deleteUserById(userId);
    return { statusCode: 204, message: 'deleted successfully' };
  }
}
