import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGODB_URI: Joi.string().uri().required(),
  DB_NAME: Joi.string().required(),
  PORT: Joi.number().port().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .required()
    .default('production'), // TODO: not configure for production env
});
