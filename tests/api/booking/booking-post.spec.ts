import { test, expect } from '@playwright/test';
import { BookingClient } from '../../../clients/booking.client';
import { validBookingData } from '../../../data/booking.data';

test.describe('Booking API - POST', () => {

  test('should create a new booking successfully', async ({ request }) => {

    const bookingClient = new BookingClient(request);

    const response = await bookingClient.createBooking(validBookingData);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.bookingid).toEqual(expect.any(Number));

    expect(responseBody.booking.firstname).toBe(validBookingData.firstname);
    expect(responseBody.booking.lastname).toBe(validBookingData.lastname);
    expect(responseBody.booking.totalprice).toBe(validBookingData.totalprice);
    expect(responseBody.booking.depositpaid).toBe(validBookingData.depositpaid);

    expect(responseBody.booking.bookingdates.checkin)
      .toBe(validBookingData.bookingdates.checkin);

    expect(responseBody.booking.bookingdates.checkout)
      .toBe(validBookingData.bookingdates.checkout);
  });

});