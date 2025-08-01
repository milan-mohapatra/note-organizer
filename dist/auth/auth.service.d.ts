import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserRole } from 'src/user/types/user.type';
import { HashingProvider } from './provider/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/common/token/token.service';
export declare class AuthService {
    private readonly userService;
    private readonly hashProvider;
    private readonly tokenService;
    constructor(userService: UserService, hashProvider: HashingProvider, tokenService: TokenService);
    createNewUser(payload: CreateUserDto): Promise<{
        token: string;
        user: import("mongodb").WithId<import("src/user/types/user.type").UserDocument>;
    }>;
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
