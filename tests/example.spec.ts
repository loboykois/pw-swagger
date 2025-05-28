import { apiClientFixture } from '../fixtures/apiClient.fixture';

apiClientFixture.describe('FakeRESTApi.Web V1', () => {
  apiClientFixture('should fetch authors successfully', async ({ apiClient }) => {
    const authorsResponse = await apiClient.authors.getAuthors();
    console.log(authorsResponse);
  });

  apiClientFixture('should fetch authors by id successfully', async ({ apiClient }) => {
    const authorsResponse = await apiClient.authors.getAuthorById(1);
    console.log(authorsResponse);
  });
});
