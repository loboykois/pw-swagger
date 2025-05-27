import { request } from '@playwright/test';

export class PWRequest {
  protected options: Partial<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body: unknown;
    params: { [key: string]: string | number | boolean };
  }> = {};

  url(url: string | URL): this {
    this.options.url = url.toString();
    return this;
  }

  method(method: string): this {
    this.options.method = method.toString();
    return this;
  }

  headers(headers: Record<string, string>): this {
    this.options.headers = this.options.headers ?? {};
    this.options.headers = {
      ...this.options.headers,
      ...headers,
    };
    return this;
  }

  searchParams(searchParams: { [key: string]: string | number | boolean }): this {
    this.options.params = searchParams;
    return this;
  }

  body(data: unknown): this {
    this.options.body = data;
    return this;
  }

  async send<T = unknown>() {
    if (this.options.url) {
      const reqContext = await request.newContext({
        baseURL: this.options.url,
      });

      const response = await reqContext.fetch(this.options.url, {
        ...this.options,
      });

      const responseBody = await response.json();

      return {
        statusCode: response.status(),
        statusText: response.statusText(),
        body: responseBody as T,
        headers: response.headers(),
      };
    }
    throw new Error('[PWRequest] url is undefined, make sure you called .url("some/url") method');
  }
}
