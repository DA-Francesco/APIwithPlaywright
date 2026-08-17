import { test as base } from '@playwright/test';
import { AuthClient } from '../clients/auth.client';
import { BookingClient } from '../clients/booking.client';

/**
 * Custom fixtures used by the API automation framework.
 *
 * authToken:
 * Provides an authentication token for tests that require
 * authenticated API access.
 *
 * bookingClient:
 * Provides an authenticated BookingClient for Booking API tests.
 */
type ApiFixtures = {
  authToken: string;
  bookingClient: BookingClient;
};

/**
 * Extends Playwright's base test with custom API fixtures.
 *
 * Fixture dependency:
 *
 * bookingClient
 *      ↓
 * authToken
 *      ↓
 * AuthClient
 */
export const test = base.extend<ApiFixtures>({
  /**
   * Creates an authentication token that can be reused
   * by dependent fixtures and tests.
   */
  authToken: async ({ request }, use) => {

    // Create the authentication client.
    const authClient = new AuthClient(request);

    // Generate the authentication token.
    const token = await authClient.getAuthToken();

    // Make the token available to the test or another fixture.
    await use(token);
  },

  /**
   * Creates an authenticated BookingClient.
   *
   * The authToken fixture is injected automatically by Playwright.
   */
  bookingClient: async ({ request, authToken }, use) => {

    // Create the Booking API client using the authenticated token.
    const bookingClient = new BookingClient(request, authToken);

    // Make the client available to the test.
    await use(bookingClient);
  },
});

/**
 * Re-export Playwright's expect function.
 */
export { expect } from '@playwright/test';