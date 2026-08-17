import { test, expect } from '../../../fixtures/api.fixture';

import {
  expectStatus,
  expectResponseOk,
expectJsonContentType,
  expectSchema,
} from '../../../utils/api.assertions';

import {
  bookingIdListSchema,
  bookingSchema,
} from '../../../schemas/booking.schema';

test.describe('Booking API - GET', () => {

test('should retrieve all bookings', async ({ bookingClient }) => {

  // Send GET request to retrieve all booking IDs.
  const response = await bookingClient.getAllBookings();

  // Validate HTTP status.
  expectStatus(response, 200);

// Verify that the API returns JSON data.
expectJsonContentType(response);

  // Validate that the response is successful.
  expectResponseOk(response);

  // Read the API response body.
  const responseBody = await response.json();

  // Validate the complete response against the API schema.
  const bookings = expectSchema(
    responseBody,
    bookingIdListSchema
  );

  // Verify that the API returned at least one booking.
  expect(bookings.length).toBeGreaterThan(0);
});

});