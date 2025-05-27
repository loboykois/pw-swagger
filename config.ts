import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Joi.object({
  SWAGGER_URL: Joi.string(),
  BASE_URL: Joi.string(),
}).unknown(true);

const envVars = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (envVars.error) {
  throw new Error(`Environment variable error: ${envVars.error.message}`);
}

export class Config {
  static readonly SWAGGER_URL: string = envVars.value.SWAGGER_URL;
  static readonly BASE_URL: string = envVars.value.BASE_URL;
}
