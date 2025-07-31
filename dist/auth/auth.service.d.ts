import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserRole } from 'src/user/types/user.type';
import { HashingProvider } from './provider/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly hashProvider;
    private readonly jwtService;
    constructor(userService: UserService, hashProvider: HashingProvider, jwtService: JwtService);
    generateAccessToken(payload: any): Promise<string>;
    createNewUser(payload: CreateUserDto): Promise<{
        token: string;
        user: import("mongodb").WithId<import("src/user/types/user.type").UserDocument>;
    }>;
    userLogin(payload: LoginUserDto): Promise<{
        token: Promise<string>;
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
