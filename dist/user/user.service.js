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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const type_casting_util_1 = require("../utils/type-casting.util");
const db_exception_1 = require("../common/exception/db.exception");
let UserService = class UserService {
    db;
    UserCollection;
    constructor(db) {
        this.db = db;
        this.UserCollection = db.collection('users');
    }
    async getAllUsers() {
        try {
            const users = await this.UserCollection.find({}, { projection: { password: 0 } }).toArray();
            return users;
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
    async getUserById(userId) {
        try {
            const user = await this.UserCollection.findOne({ _id: (0, type_casting_util_1.toObjectId)(userId) }, { projection: { password: 0 } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
    async updateUserById(body, userId) {
        try {
            const updatedUser = await this.UserCollection.findOneAndUpdate({ _id: (0, type_casting_util_1.toObjectId)(userId) }, { $set: { ...body, updatedAt: new Date() } }, { returnDocument: 'after', projection: { password: 0 } });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
    async deleteUserById(userId) {
        try {
            const result = await this.UserCollection.deleteOne({
                _id: (0, type_casting_util_1.toObjectId)(userId),
            });
            if (result.deletedCount === 0) {
                throw new common_1.NotFoundException('User not found');
            }
            return;
        }
        catch (error) {
            (0, db_exception_1.handleDatabaseError)(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MONGO_DB')),
    __metadata("design:paramtypes", [mongodb_1.Db])
], UserService);
//# sourceMappingURL=user.service.js.map