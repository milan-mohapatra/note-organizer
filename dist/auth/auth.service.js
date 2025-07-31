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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const db_exception_1 = require("../common/exception/db.exception");
const user_type_1 = require("../user/types/user.type");
const type_casting_util_1 = require("../utils/type-casting.util");
const hashing_provider_1 = require("./provider/hashing.provider");
let AuthService = class AuthService {
    db;
    hashProvider;
    UserCollection;
    constructor(db, hashProvider) {
        this.db = db;
        this.hashProvider = hashProvider;
        this.UserCollection = db.collection('users');
    }
    async createNewUser(payload) {
        try {
            const existing = await this.UserCollection.findOne({
                email: payload.email,
            });
            if (existing) {
                throw new common_1.ConflictException('Email already exist');
            }
            const userToInsert = {
                ...payload,
                password: await this.hashProvider.hashPassword(payload.password),
                role: user_type_1.UserRole.User,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = await this.UserCollection.insertOne(userToInsert);
            const user = await this.UserCollection.findOne({ _id: (0, type_casting_util_1.toObjectId)(result.insertedId) }, { projection: { password: 0 } });
            return user;
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
    async userLogin(payload) {
        try {
            const user = await this.UserCollection.findOne({ email: payload.email });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const isValidPassword = await this.hashProvider.comparePassword(payload.password, user.password);
            if (!isValidPassword) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const { password, ...userWithNoPassword } = user;
            return { token: 'jwt-token', user: userWithNoPassword };
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MONGO_DB')),
    __param(1, (0, common_1.Inject)(hashing_provider_1.HashingProvider)),
    __metadata("design:paramtypes", [mongodb_1.Db,
        hashing_provider_1.HashingProvider])
], AuthService);
//# sourceMappingURL=auth.service.js.map