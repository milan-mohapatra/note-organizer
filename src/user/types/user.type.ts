import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../dtos/create-user.dto';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// What gets stored in DB
export interface UserDocument extends CreateUserDto {
  _id?: ObjectId;
  //   password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// What gets inserted
export type TUserToInsert = Omit<UserDocument, '_id'>;
