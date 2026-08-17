import { test, expect } from '../../../fixtures/api.fixture';
import { validBookingData } from '../../../data/booking.data';
import { createBookingResponseSchema } from '../../../schemas/booking.schema';
import {
  expectStatus,
  expectResponseOk,
  expectSchema,
expectJsonContentType,
} from '../../../utils/api.assertions';

test('should create a new booking', async ({ bookingClient }) => {

  // ---------------------------------------------------------
  // 1. CREATE BOOKING
  // ---------------------------------------------------------

  // Send the POST request using the reusable BookingClient.
  const response = await bookingClient.createBooking(validBookingData);

  // Convert the API response into a JavaScript object.
  // This object will be reused for all response validations.
  const responseBody = await response.json();

  // ---------------------------------------------------------
//  2. HTTP RESPONSE ASSERTIONS
// ---------------------------------------------------------

// Verify the HTTP status code.
expectStatus(response, 200);

// Verify that Playwright considers the response successful.
expectResponseOk(response);

// Verify that the response is returned as JSON.
expectJsonContentType(response);

// ---------------------------------------------------------
// 3.  SCHEMA VALIDATION
// ---------------------------------------------------------

const validatedBookingResponse = expectSchema(
  responseBody,
  createBookingResponseSchema
);

  // ---------------------------------------------------------
// 4. BUSINESS DATA ASSERTIONS
// ---------------------------------------------------------

expect(validatedBookingResponse.booking.firstname)
  .toBe(validBookingData.firstname);

expect(validatedBookingResponse.booking.lastname)
  .toBe(validBookingData.lastname);

expect(validatedBookingResponse.booking.totalprice)
  .toBe(validBookingData.totalprice);

expect(validatedBookingResponse.booking.depositpaid)
  .toBe(validBookingData.depositpaid);

expect(validatedBookingResponse.bookingid)
  .toBeGreaterThan(0);

});