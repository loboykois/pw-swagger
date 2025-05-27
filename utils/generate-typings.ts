import { execSync } from 'child_process';
import { Config } from '../config';

export default async function generateTypings() {
  execSync(`npx openapi-typescript ${Config.SWAGGER_URL} -o ./.temp/types.ts`, { stdio: 'inherit' });
}
