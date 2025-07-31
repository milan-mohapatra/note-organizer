import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
