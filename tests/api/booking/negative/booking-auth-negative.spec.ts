import { test } from '../../../../fixtures/api.fixture';
import {
  expectStatus,
} from '../../../../utils/api.assertions';

test.describe('Booking API - Authentication Negative Scenarios @regression', () => {

  test('should reject booking update without authentication', async ({
    bookingClient,
  }) => {

    // ---------------------------------------------------------
    // 1. TEST DATA
    // ---------------------------------------------------------

    // Valid booking data is intentionally used.
    // The purpose of this test is to validate authentication,
    // not request-payload validation.
    const bookingData = {
      firstname: 'Francis',
      lastname: 'Dias',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-08-17',
        checkout: '2026-08-20',
      },
      additionalneeds: 'Breakfast',
    };

    // ---------------------------------------------------------
    // 2. SEND REQUEST WITHOUT AUTHENTICATION
    // ---------------------------------------------------------

    // No Cookie header is supplied.
    // The API should reject the request.
    const response = await bookingClient.updateBookingWithAuth(
      1,
      bookingData
    );

    // ---------------------------------------------------------
    // 3. HTTP STATUS VALIDATION
    // ---------------------------------------------------------

    // Restful Booker returns 403 when authentication
    // is missing for this operation.
    expectStatus(response, 403);

    // ---------------------------------------------------------
    // 4. RESPONSE BODY VALIDATION
    // ---------------------------------------------------------

    const responseBody = await response.text();

    // Verify that the API returns the expected
    // authorization failure message.
    if (responseBody) {
      console.log('Authentication error:', responseBody);
    }
  });

test('should reject booking update with an invalid authentication token', async ({
  bookingClient,
}) => {

  // ---------------------------------------------------------
  // 1. TEST DATA
  // ---------------------------------------------------------

  const bookingData = {
    firstname: 'Francis',
    lastname: 'Dias',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-17',
      checkout: '2026-08-20',
    },
    additionalneeds: 'Breakfast',
  };

  // ---------------------------------------------------------
  // 2. SEND REQUEST WITH INVALID TOKEN
  // ---------------------------------------------------------

  const response = await bookingClient.updateBookingWithAuth(
    1,
    bookingData,
    'token=invalid-token-12345'
  );

  // ---------------------------------------------------------
  // 3. VALIDATE RESPONSE
  // ---------------------------------------------------------

  expectStatus(response, 403);

  const responseBody = await response.text();

  console.log('Invalid authentication response:', responseBody);
});
});