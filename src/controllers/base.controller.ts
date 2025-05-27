import { PWRequest } from '../request';

export type ControllerOptions = {
  url: string;
};

export class BaseController {
  constructor(protected readonly options: ControllerOptions) {}

  protected request(): PWRequest {
    return new PWRequest().url(this.options.url);
  }
}
