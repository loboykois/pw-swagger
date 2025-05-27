import { Config } from '../../config';
import { BaseController } from './base.controller';
import { components } from '../../.temp/types';
import { API_STATUSES } from '../../utils/api-statuses';
import { expect } from '@playwright/test';

export type Author = components['schemas']['Author'];
export type Authors = components['schemas']['Author'][];

export class AuthorsController extends BaseController {
  private readonly url = Config.AUTHORS_URL;

  async getAuthors() {
    const response = await this.request().url(this.url).method('GET').send<Authors>();

    expect(response.statusCode).toBe(API_STATUSES.SUCCESSFUL_200_STATUS);

    return response.body;
  }

  async getAuthorById(id: number) {
    const response = await this.request().url(`${this.url}/${id}`).method('GET').send<Author>();

    expect(response.statusCode).toBe(API_STATUSES.SUCCESSFUL_200_STATUS);

    return response.body;
  }
}
