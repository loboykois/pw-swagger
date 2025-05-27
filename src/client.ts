import { Config } from '../config';
import { AuthorsController } from './controllers/authors.controller';
import { ControllerOptions } from './controllers/base.controller';

export class ApiClient {
  public readonly authors: AuthorsController;

  constructor(options?: Partial<ControllerOptions>) {
    const defaultOptions = {
      url: Config.BASE_URL,
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    this.authors = new AuthorsController(mergedOptions);
  }
}
