import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './dtos/create-user.dto';
import { toObjectId } from 'src/utils/type-casting.util';
import { UpdateUserDto } from './dtos/update-user.dto';
import { TUserToInsert, UserDocument, UserRole } from './types/user.type';

@Injectable()
export class UserService {
  private UserCollection: Collection<UserDocument>;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    // defining user collection
    this.UserCollection = db.collection<UserDocument>('users');
  }

  async createNewUser(payload: CreateUserDto) {
    // TODO: generating encrypted password

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
        role: UserRole.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // creating new user
      const result = await this.UserCollection.insertOne(userToInsert);

      return await this.getUserById(result.insertedId);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.UserCollection.find(
        {},
        { projection: { password: 0 } },
      ).toArray();
      return users;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async getUserById(userId: string | ObjectId) {
    try {
      const user = await this.UserCollection.findOne(
        { _id: toObjectId(userId) },
        { projection: { password: 0 } },
      );

      // check user not found
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async updateUserById(body: UpdateUserDto, userId: string | ObjectId) {
    try {
      const updatedUser = await this.UserCollection.findOneAndUpdate(
        { _id: toObjectId(userId) },
        { $set: { ...body, updatedAt: new Date() } },
        { returnDocument: 'after', projection: { password: 0 } },
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async deleteUserById(userId: string | ObjectId) {
    try {
      const result = await this.UserCollection.deleteOne({
        _id: toObjectId(userId),
      });

      // check user not found
      if (result.deletedCount === 0) {
        throw new NotFoundException('User not found');
      }

      return;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  //shared error handler for db operation
  private handleDatabaseError(error: unknown): never {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new InternalServerErrorException(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}
