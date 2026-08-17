import { test, expect } from '@playwright/test';
import { BookingClient } from '../../../clients/booking.client';

test.describe('Booking API - GET', () => {

  test('should retrieve all bookings successfully', async ({ request }) => {

    const bookingClient = new BookingClient(request);

    const response = await bookingClient.getAllBookings();

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
  });

});