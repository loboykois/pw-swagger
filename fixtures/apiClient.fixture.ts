import { test as base, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../src/client';

type ApiClientFixtures = {
  apiClient: ApiClient;
};

export const test = base.extend<ApiClientFixtures>({
  apiClient: async ({}, use) => {
    const apiClient = new ApiClient();
    await use(apiClient);
  },
});
