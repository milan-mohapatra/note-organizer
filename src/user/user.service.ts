import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { toObjectId } from 'src/utils/type-casting.util';
import { UpdateUserDto } from './dtos/update-user.dto';
import { TUserToInsert, UserDocument } from './types/user.type';
import { handleDatabaseError } from 'src/common/exception/db.exception';

@Injectable()
export class UserService {
  private UserCollection: Collection<UserDocument>;

  constructor(@Inject('MONGO_DB') private readonly db: Db) {
    // defining user collection
    this.UserCollection = db.collection<UserDocument>('users');
  }

  async createNewUser(payload: TUserToInsert) {
    try {
      return await this.UserCollection.insertOne(payload);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.UserCollection.findOne({ email });
    } catch (error) {
      handleDatabaseError(error);
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
      handleDatabaseError(error);
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
      handleDatabaseError(error);
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
      handleDatabaseError(error);
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
      handleDatabaseError(error);
    }
  }
}
