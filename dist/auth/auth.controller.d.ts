import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            token: string;
            user: import("mongodb").WithId<import("../user/types/user.type").UserDocument>;
        };
    }>;
    logIn(body: LoginUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            token: string;
            user: {
                role: import("../user/types/user.type").UserRole;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                _id: import("bson").ObjectId;
            };
        };
    }>;
}
