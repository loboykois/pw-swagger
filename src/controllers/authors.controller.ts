import { expect } from '@playwright/test';
import { Config } from '../../config';
import { BaseController } from './base.controller';
import { components } from '../../.temp/types';

export type Author = components['schemas']['Author'];
export type Authors = components['schemas']['Author'][];

export class AuthorsController extends BaseController {
  private readonly url = `${Config.BASE_URL}/api/v1/Authors`;

  async getAuthors() {
    const response = await this.request().url(this.url).method('GET').send<Authors>();

    expect(response.statusCode).toBe(200);

    return response.body;
  }

  async getAuthorById(id: number) {
    const response = await this.request().url(`${this.url}/${id}`).method('GET').send<Author>();

    expect(response.statusCode).toBe(200);

    return response.body;
  }
}
