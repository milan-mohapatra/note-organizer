"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../common/token/token.service");
let AuthorizeGuard = class AuthorizeGuard {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split(' ').at(1);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const tokenPayload = await this.tokenService.verifyToken(token);
            req['user'] = tokenPayload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.AuthorizeGuard = AuthorizeGuard;
exports.AuthorizeGuard = AuthorizeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], AuthorizeGuard);
//# sourceMappingURL=authorize.guard.js.map