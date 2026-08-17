import { test, expect } from '../../../../fixtures/api.fixture';
import { validBookingData } from '../../../../data/booking.data';

/**
 * Booking CRUD workflow.
 *
 * This test validates the lifecycle of a booking:
 *
 * POST  -> Create booking
 * GET   -> Verify created booking
 * PUT   -> Update booking
 * GET   -> Verify updated booking
 * DELETE -> Delete booking
 * GET   -> Verify booking no longer exists
 *
 * The booking ID is generated dynamically during execution,
 * so the test does not depend on hardcoded test data.
 */
test.describe('Booking API - CRUD Workflow @regression', () => {

  test('should create, retrieve, update and delete a booking', async ({ bookingClient }) => {

    // ---------------------------------------------------------
    // 1. CREATE BOOKING
    // ---------------------------------------------------------

    const createResponse =
      await bookingClient.createBooking(validBookingData);

    expect(createResponse.status()).toBe(200);
    expect(createResponse.ok()).toBeTruthy();

    const createResponseBody = await createResponse.json();

    // Capture the dynamically generated booking ID.
    const bookingId = createResponseBody.bookingid;

    expect(bookingId).toEqual(expect.any(Number));

    // Validate that the created booking contains the submitted data.
    expect(createResponseBody.booking.firstname)
      .toBe(validBookingData.firstname);

    expect(createResponseBody.booking.lastname)
      .toBe(validBookingData.lastname);

    // ---------------------------------------------------------
    // 2. GET CREATED BOOKING
    // ---------------------------------------------------------

    const getResponse =
      await bookingClient.getBookingById(bookingId);

    expect(getResponse.status()).toBe(200);
    expect(getResponse.ok()).toBeTruthy();

    const getResponseBody = await getResponse.json();

    // Verify that the booking retrieved using the generated ID
    // contains the data submitted during creation.
    expect(getResponseBody).toMatchObject({
      firstname: validBookingData.firstname,
      lastname: validBookingData.lastname,
      totalprice: validBookingData.totalprice,
      depositpaid: validBookingData.depositpaid,
      bookingdates: validBookingData.bookingdates,
    });

    // ---------------------------------------------------------
    // 3. UPDATE BOOKING
    // ---------------------------------------------------------

    const updatedBookingData = {
      ...validBookingData,
      firstname: 'UpdatedFrancis',
      totalprice: 500,
    };

    const updateResponse =
      await bookingClient.updateBooking(
        bookingId,
        updatedBookingData
      );

    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.ok()).toBeTruthy();

    // ---------------------------------------------------------
    // 4. VERIFY UPDATED BOOKING
    // ---------------------------------------------------------

    const verifyUpdateResponse =
      await bookingClient.getBookingById(bookingId);

    expect(verifyUpdateResponse.status()).toBe(200);

    const verifyUpdateBody = await verifyUpdateResponse.json();

    expect(verifyUpdateBody.firstname)
      .toBe(updatedBookingData.firstname);

    expect(verifyUpdateBody.totalprice)
      .toBe(updatedBookingData.totalprice);

    // ---------------------------------------------------------
    // 5. DELETE BOOKING
    // ---------------------------------------------------------

    const deleteResponse =
      await bookingClient.deleteBooking(bookingId);

    expect(deleteResponse.status()).toBe(201);

    // ---------------------------------------------------------
    // 6. VERIFY DELETION
    // ---------------------------------------------------------

    const verifyDeleteResponse =
      await bookingClient.getBookingById(bookingId);

    // Restful Booker returns 404 when the booking no longer exists.
    expect(verifyDeleteResponse.status()).toBe(404);
  });

});