import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGODB_URI: Joi.string().uri().required(),
  DB_NAME: Joi.string().required(),
  PORT: Joi.number().port().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .required()
    .default('production'), // TODO: not configure for production env
  JWT_TOKEN_SECRET: Joi.string().required(), // TODO: not configure for production env and test
  JWT_TOKEN_EXPIRES_IN_SEC: Joi.number().required(), // TODO: not configure for production env and test
});
