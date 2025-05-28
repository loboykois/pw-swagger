import { expect } from '@playwright/test';
import { apiClientFixture } from '../fixtures/apiClient.fixture';
import { API_STATUSES } from '../utils/api-statuses';
import { components } from '../.temp/types';

apiClientFixture.describe('FakeRESTApi.Web V1', () => {
  apiClientFixture('should fetch authors successfully', async ({ apiClient }) => {
    const authorsResponse = await apiClient.authors.getAuthors(API_STATUSES.SUCCESSFUL_200_STATUS);
    console.log(authorsResponse);
  });

  apiClientFixture('should fetch authors by id successfully', async ({ apiClient }) => {
    const authorsResponse = await apiClient.authors.getAuthorById(1, API_STATUSES.SUCCESSFUL_200_STATUS);

    expect(authorsResponse.body?.id).toBe(1);
    expect(authorsResponse.body?.firstName).toContain('First Name');
    expect(authorsResponse.body?.lastName).toContain('Last Name');
  });

  apiClientFixture('should create author successfully', async ({ apiClient }) => {
    const authorToCreate: components['schemas']['Author'] = {
      id: 1005,
      firstName: 'MyFirstName Author',
      lastName: 'LastName Author',
      idBook: 1005,
    };

    const authorResponse = await apiClient.authors.createAuthor(authorToCreate, API_STATUSES.SUCCESSFUL_200_STATUS);
    console.log(authorResponse.body);

    const deletedAuthor = await apiClient.authors.deleteAuthor(authorResponse.body.id ?? -1, API_STATUSES.SUCCESSFUL_200_STATUS);

    if ('statusCode' in deletedAuthor) {
      console.log(deletedAuthor.statusCode);
      console.log(deletedAuthor.statusText);
    }

    const receivedDeletedAuthor = await apiClient.authors.getAuthorById(authorResponse.body.id ?? -1, API_STATUSES.NOT_FOUND_404_STATUS);
    expect(receivedDeletedAuthor.statusText).toEqual('Not Found');
  });
});
