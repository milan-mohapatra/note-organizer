import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../dtos/create-user.dto';
export declare enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}
export interface UserDocument extends CreateUserDto {
    _id?: ObjectId;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export type TUserToInsert = Omit<UserDocument, '_id'>;
