import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        statusCode: number;
        data: import("mongodb").WithId<import("./types/user.type").UserDocument>[];
    }>;
    getUser(userId: any): Promise<{
        statusCode: number;
        data: import("mongodb").WithId<import("./types/user.type").UserDocument>;
    }>;
    updateUser(body: UpdateUserDto, userId: any): Promise<{
        statusCode: number;
        message: string;
        data: import("mongodb").WithId<import("./types/user.type").UserDocument>;
    }>;
    deleteUser(userId: any): Promise<{
        statusCode: number;
        message: string;
    }>;
}
