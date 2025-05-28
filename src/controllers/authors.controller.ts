import { Config } from '../../config';
import { BaseController } from './base.controller';
import { components } from '../../.temp/types';
import { expect } from '@playwright/test';

export type Author = components['schemas']['Author'];
export type Authors = components['schemas']['Author'][];

export interface ResponseOptions<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: T;
}

export class AuthorsController extends BaseController {
  private readonly url = Config.AUTHORS_URL;

  async getAuthors(statusCode: number) {
    const response = await this.request().url(this.url).method('GET').send<Authors>();

    expect(response.statusCode).toBe(statusCode);

    return response.body;
  }

  async getAuthorById(id: number, statusCode: number) {
    const response = await this.request().url(`${this.url}/${id}`).method('GET').send<Author>();

    expect(response.statusCode).toBe(statusCode);

    return {
      body: response.body,
      headers: response.headers,
      status: response.statusCode,
      statusText: response.statusText,
    } as ResponseOptions<Author>;
  }

  async createAuthor(author: Author) {
    const response = await this.request()
      .url(this.url)
      .method('POST')
      .body(author)
      .headers({
        'Content-Type': 'application/json; v=1.0',
      })
      .send<Author>();

    // expect(response.statusCode).toBe(statusCode);

    return {
      body: response.body,
      headers: response.headers,
      status: response.statusCode,
      statusText: response.statusText,
    } as ResponseOptions<Author>;
  }
}
