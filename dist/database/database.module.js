"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongodb_1 = require("mongodb");
let DataBaseModule = class DataBaseModule {
};
exports.DataBaseModule = DataBaseModule;
exports.DataBaseModule = DataBaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: 'MONGO_CLIENT',
                useFactory: async (configService) => {
                    try {
                        const URI = configService.get('MONGODB_URI');
                        if (!URI) {
                            throw new common_1.InternalServerErrorException('MONGODB_URI is not defined in the environment');
                        }
                        const NODE_ENV = configService.get('NODE_ENV');
                        if (NODE_ENV) {
                            console.log('Running ' + NODE_ENV?.trim() + ' environment');
                        }
                        const client = new mongodb_1.MongoClient(URI);
                        await client.connect();
                        console.log('DB connected');
                        return client;
                    }
                    catch (err) {
                        console.error('MongoDB connection failed', err);
                        throw new common_1.InternalServerErrorException('Failed to connect to MongoDB');
                    }
                },
                inject: [config_1.ConfigService],
            },
            {
                provide: 'MONGO_DB',
                useFactory: async (client, configService) => {
                    try {
                        const dbName = configService.get('DB_NAME');
                        if (!dbName) {
                            throw new common_1.InternalServerErrorException('DB_NAME is not defined in the environment');
                        }
                        return client.db(dbName);
                    }
                    catch (err) {
                        console.error('Database initialization failed', err);
                        throw new common_1.InternalServerErrorException('Failed to initialize MongoDB database');
                    }
                },
                inject: ['MONGO_CLIENT', config_1.ConfigService],
            },
        ],
        exports: ['MONGO_CLIENT', 'MONGO_DB'],
    })
], DataBaseModule);
//# sourceMappingURL=database.module.js.map