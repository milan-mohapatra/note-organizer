import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { handleDatabaseError } from 'src/common/exception/db.exception';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { TUserToInsert, UserRole } from 'src/user/types/user.type';
import { HashingProvider } from './provider/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(HashingProvider) private readonly hashProvider: HashingProvider,
    private readonly tokenService: TokenService,
  ) {}

  async createNewUser(payload: CreateUserDto) {
    try {
      // checking if email already exist
      const existing = await this.userService.getUserByEmail(payload.email);

      if (existing) {
        throw new ConflictException('Email already exist');
      }

      const userToInsert: TUserToInsert = {
        ...payload,
        password: await this.hashProvider.hashPassword(payload.password),
        role: UserRole.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // creating new user
      const result = await this.userService.createNewUser(userToInsert);

      const user = await this.userService.getUserById(result.insertedId);

      const jwtToken = await this.tokenService.signToken({
        _id: user._id,
        role: user.role,
      });

      return { token: jwtToken, user };
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async userLogin(payload: LoginUserDto) {
    try {
      const user = await await this.userService.getUserByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isValidPassword = await this.hashProvider.comparePassword(
        payload.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // remove sensitive data before returning
      const { password, ...userWithNoPassword } = user;

      const jwtToken = await this.tokenService.signToken({
        _id: user._id,
        role: user.role,
      });

      return { token: jwtToken, user: userWithNoPassword };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
