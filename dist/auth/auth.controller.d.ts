import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(body: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongodb").WithId<import("../user/types/user.type").UserDocument>;
    }>;
}
