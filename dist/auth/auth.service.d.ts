import { Db } from 'mongodb';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDocument, UserRole } from 'src/user/types/user.type';
import { HashingProvider } from './provider/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
export declare class AuthService {
    private readonly db;
    private readonly hashProvider;
    private UserCollection;
    constructor(db: Db, hashProvider: HashingProvider);
    createNewUser(payload: CreateUserDto): Promise<import("mongodb").WithId<UserDocument> | null>;
    userLogin(payload: LoginUserDto): Promise<{
        token: string;
        user: {
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            _id: import("bson").ObjectId;
        };
    }>;
}
