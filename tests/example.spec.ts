// import { test } from '@playwright/test';
import { test } from '../fixtures/apiClient.fixture';
import { ApiClient } from '../src/client';

test.describe('FakeRESTApi.Web V1', () => {
  // test('should fetch authors successfully', async () => {
  //   const apiClient = new ApiClient();

  //   const authorsResponse = await apiClient.authors.getAuthors();
  //   console.log(authorsResponse);
  // });

  // test('should fetch authors by id successfully', async () => {
  //   const apiClient = new ApiClient();

  //   const authorsResponse = await apiClient.authors.getAuthorById(1);
  //   console.log(authorsResponse);
  // });

  test('should fetch authors by id successfully with fixture', async ({ apiClient }) => {
    const authorsResponse = await apiClient.authors.getAuthorById(1);
    console.log(authorsResponse);
  });
});
