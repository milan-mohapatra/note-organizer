import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { handleDatabaseError } from 'src/common/exception/db.exception';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import {
  TUserToInsert,
  UserDocument,
  UserRole,
} from 'src/user/types/user.type';
import { toObjectId } from 'src/utils/type-casting.util';
import { HashingProvider } from './provider/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  private UserCollection: Collection<UserDocument>;

  constructor(
    @Inject('MONGO_DB') private readonly db: Db,
    @Inject(HashingProvider) private readonly hashProvider: HashingProvider,
  ) {
    // defining user collection
    this.UserCollection = db.collection<UserDocument>('users');
  }

  // POST /auth/signup
  async createNewUser(payload: CreateUserDto) {
    try {
      // checking if email already exist
      const existing = await this.UserCollection.findOne({
        email: payload.email,
      });

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
      const result = await this.UserCollection.insertOne(userToInsert);

      const user = await this.UserCollection.findOne(
        { _id: toObjectId(result.insertedId) },
        { projection: { password: 0 } },
      );

      return user;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  // /auth/login
  async userLogin(payload: LoginUserDto) {
    try {
      const user = await this.UserCollection.findOne({ email: payload.email });

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

      //   TODO: generate JWT token
      return { token: 'jwt-token', user: userWithNoPassword };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
