import { test } from '@playwright/test';
import { ApiClient } from '../src/client';

type ApiClientFixtures = {
  apiClient: ApiClient;
};

export const apiClientFixture = test.extend<ApiClientFixtures>({
  apiClient: async ({}, use) => {
    const apiClient = new ApiClient();
    await use(apiClient);
  },
});
