"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const Joi = require("joi");
exports.envValidationSchema = Joi.object({
    MONGODB_URI: Joi.string().uri().required(),
    DB_NAME: Joi.string().required(),
    PORT: Joi.number().port().default(3000),
    NODE_ENV: Joi.string()
        .valid('development', 'test', 'production')
        .required()
        .default('production'),
    JWT_TOKEN_SECRET: Joi.string().required(),
    JWT_TOKEN_EXPIRES_IN_SEC: Joi.number().required(),
});
//# sourceMappingURL=env.validation.js.map