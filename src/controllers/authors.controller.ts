import { Config } from '../../config';
import { BaseController } from './base.controller';
import { components } from '../../.temp/types';
import { expect } from '@playwright/test';
import { step } from '../../utils/step';

export type Author = components['schemas']['Author'];
export type Authors = components['schemas']['Author'][];

export class AuthorsController extends BaseController {
  private readonly url = Config.AUTHORS_URL;

  // GET
  @step()
  async getAuthors(statusCode: number) {
    const response = await this.request().url(this.url).method('GET').send<Authors>();

    expect(response.statusCode).toBe(statusCode);

    return response.body;
  }

  @step()
  async getAuthorById(id: number, statusCode: number) {
    const response = await this.request().url(`${this.url}/${id}`).method('GET').send<Author>();

    expect(response.statusCode).toBe(statusCode);

    return {
      body: response.body,
      headers: response.headers,
      status: response.statusCode,
      statusText: response.statusText,
    };
  }

  // POST
  @step()
  async createAuthor(data: Author, statusCode: number) {
    const response = await this.request()
      .url(this.url)
      .method('POST')
      .body(data)
      .headers({
        'Content-Type': 'application/json; v=1.0',
      })
      .send<Author>();

    expect(response.statusCode).toBe(statusCode);

    return {
      body: response.body,
      headers: response.headers,
      status: response.statusCode,
      statusText: response.statusText,
    };
  }

  // DELETE
  @step()
  async deleteAuthor(id: number, statusCode: number) {
    const response = await this.request().url(`${this.url}/${id}`).method('DELETE').send<{ message: string }>();

    expect(response.statusCode).toBe(statusCode);

    return response.statusCode === 200
      ? response
      : {
          message: `Error | status code: ${response.statusCode} | status text: ${response.statusText} | headers: ${JSON.stringify(response.headers)}`,
        };
  }
}
