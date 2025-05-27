import { expect } from '@playwright/test';
import { Config } from '../../config';
import { BaseController } from './base.controller';

export class AuthorsController extends BaseController {
  async getAuthors() {
    const response = await this.request().url(`${Config.BASE_URL}/api/v1/Authors`).send();

    expect(response.statusCode).toBe(200);

    return response.body;
  }
}
