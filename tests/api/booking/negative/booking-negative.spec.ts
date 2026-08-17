import { test, expect } from '../../../../fixtures/api.fixture';

import {
  expectStatus,
} from '../../../../utils/api.assertions';

test.describe('Booking API - Negative Scenarios @regression', () => {

  test('should return 404 when retrieving a non-existent booking', async ({
    bookingClient,
  }) => {

    // ---------------------------------------------------------
    // 1. REQUEST
    // ---------------------------------------------------------

    // Use a booking ID that should not exist.
    const response = await bookingClient.getBookingById(999999);

    // ---------------------------------------------------------
    // 2. HTTP RESPONSE VALIDATION
    // ---------------------------------------------------------

    // A non-existent resource should return HTTP 404.
    expectStatus(response, 404);


    // ---------------------------------------------------------
    // 3. RESPONSE BODY VALIDATION
    // ---------------------------------------------------------

    // Read the response body so that we can validate the
    // error returned by the API.
    const responseBody = await response.text();

    // The response should contain an appropriate not-found message.
    expect(responseBody).toContain('Not Found');
  });

test('should handle a booking request with missing firstname', async ({
  bookingClient,
}) => {

  // ---------------------------------------------------------
  // 1. INVALID REQUEST PAYLOAD
  // ---------------------------------------------------------

  // firstname is intentionally omitted from the request.
  // This allows us to verify how the API handles incomplete data.
  const invalidBookingData: Record<string, unknown> = {
    lastname: 'Test',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-17',
      checkout: '2026-08-20',
    },
    additionalneeds: 'Breakfast',
  };

  // ---------------------------------------------------------
  // 2. SEND INVALID REQUEST
  // ---------------------------------------------------------

  const response = await bookingClient.createBooking(
    invalidBookingData
  );

  // ---------------------------------------------------------
  // 3. RESPONSE VALIDATION
  // ---------------------------------------------------------

  // The API currently responds with HTTP 500 when firstname
  // is missing from the booking request.
  //
  // This represents the current API behaviour and may indicate
  // a server-side validation defect.
  expectStatus(response, 500);

  // Validate the error message returned by the API.
  const responseBody = await response.text();

  expect(responseBody).toContain('Internal Server Error');
});

});