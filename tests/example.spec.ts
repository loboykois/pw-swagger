import { test } from '@playwright/test';
import { ApiClient } from '../src/client';

test('should fetch authors successfully', async () => {
  const apiClient = new ApiClient();

  const authorsResponse = await apiClient.authors.getAuthors();
  console.log(authorsResponse);
});
