import { Db, ObjectId } from 'mongodb';
import { UpdateUserDto } from './dtos/update-user.dto';
import { TUserToInsert, UserDocument } from './types/user.type';
export declare class UserService {
    private readonly db;
    private UserCollection;
    constructor(db: Db);
    createNewUser(payload: TUserToInsert): Promise<import("mongodb").InsertOneResult<UserDocument>>;
    getUserByEmail(email: string): Promise<import("mongodb").WithId<UserDocument> | null>;
    getAllUsers(): Promise<import("mongodb").WithId<UserDocument>[]>;
    getUserById(userId: string | ObjectId): Promise<import("mongodb").WithId<UserDocument>>;
    updateUserById(body: UpdateUserDto, userId: string | ObjectId): Promise<import("mongodb").WithId<UserDocument>>;
    deleteUserById(userId: string | ObjectId): Promise<void>;
}
