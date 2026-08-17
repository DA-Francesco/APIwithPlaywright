import { APIRequestContext } from '@playwright/test';
import { environment } from '../config/environment';

/**
 * Handles authentication-related API operations.
 *
 * Credentials are obtained from the environment configuration
 * instead of being hardcoded in the source code.
 */
export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Authenticates against the Restful Booker API and returns
   * the generated authentication token.
   */
  async getAuthToken(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: {
        username: environment.apiUsername,
        password: environment.apiPassword,
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Authentication failed. Status: ${response.status()}`
      );
    }

    const responseBody = await response.json();

    return responseBody.token;
  }
}