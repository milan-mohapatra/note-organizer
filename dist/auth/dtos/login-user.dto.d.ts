import { CreateUserDto } from 'src/user/dtos/create-user.dto';
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
