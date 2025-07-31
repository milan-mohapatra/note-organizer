import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './types/user.type';
export declare class UserService {
    private readonly db;
    private UserCollection;
    constructor(db: Db);
    createNewUser(payload: CreateUserDto): Promise<import("mongodb").WithId<UserDocument>>;
    getAllUsers(): Promise<import("mongodb").WithId<UserDocument>[]>;
    getUserById(userId: string | ObjectId): Promise<import("mongodb").WithId<UserDocument>>;
    updateUserById(body: UpdateUserDto, userId: string | ObjectId): Promise<import("mongodb").WithId<UserDocument>>;
    deleteUserById(userId: string | ObjectId): Promise<void>;
    private handleDatabaseError;
}
