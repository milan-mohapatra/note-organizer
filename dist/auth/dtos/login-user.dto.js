"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../user/dtos/create-user.dto");
class LoginUserDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=login-user.dto.js.map