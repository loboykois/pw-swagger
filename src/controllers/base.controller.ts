import { PWRequest } from '../request';

export type ControllerOptions = {
  url: string;
};

export class BaseController {
  protected readonly baseUrl: string;

  constructor(protected readonly options: ControllerOptions) {
    this.baseUrl = this.options.url.endsWith('/') ? this.options.url : `${this.options.url}/`;
  }

  protected request(): PWRequest {
    return new PWRequest().url(this.baseUrl);
  }
}
