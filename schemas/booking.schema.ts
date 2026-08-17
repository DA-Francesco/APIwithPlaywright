import { z } from 'zod';

/**
 * Schema representing the booking dates returned by the API.
 */
export const bookingDatesSchema = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

/**
 * Schema representing a complete booking returned by the API.
 *
 * This validates both:
 * - Property names
 * - Expected data types
 */
export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  additionalneeds: z.string().optional(),
});

/**
 * Schema representing the response returned when
 * creating a booking.
 */
export const createBookingResponseSchema = z.object({
  bookingid: z.number(),
  booking: bookingSchema,
});

/**
 * Schema representing a single booking ID returned
 * by the GET /booking endpoint.
 */
export const bookingIdSchema = z.object({
  bookingid: z.number(),
});

/**
 * Schema representing the complete response returned
 * by GET /booking.
 *
 * The API returns an array of booking ID objects.
 */
export const bookingIdListSchema = z.array(bookingIdSchema);