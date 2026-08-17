import { APIRequestContext, APIResponse } from '@playwright/test';
import { BookingData } from '../data/booking.data';

/**
 * API client responsible for all Booking endpoint operations.
 *
 * Public GET operations can be performed without authentication.
 * Update and delete operations require authentication.
 */
export class BookingClient {

  constructor(
    private readonly request: APIRequestContext,
    private readonly token?: string
  ) {}

  /**
   * Retrieves all available bookings.
   */
  async getAllBookings(): Promise<APIResponse> {
    return this.request.get('/booking');
  }

  /**
   * Retrieves a booking using its booking ID.
 *
   * This method is used by both positive workflow tests
   * and negative tests where the booking may not exist.
   */
  async getBookingById(bookingId: number): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }

  /**
   * Creates a new booking.
   *
   * The generic type allows positive tests to use the strongly
   * typed BookingData model while negative tests can deliberately
   * provide malformed request data.
   */
  async createBooking<T = BookingData>(
    data: T
  ): Promise<APIResponse> {
    return this.request.post('/booking', {
      data,
    });
  }

  /**
   * Completely replaces an existing booking.
   *
   * Authentication is required for this operation.
   */
  async updateBooking(
    bookingId: number,
    bookingData: BookingData
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Updates a booking while allowing the test to explicitly
   * control the authentication header.
   *
   * This method is intended for negative authentication tests.
   *
   * Examples:
   * - No authentication header
   * - Invalid authentication token
   * - Malformed authentication header
   */
  async updateBookingWithAuth(
    bookingId: number,
    bookingData: BookingData,
    authHeader?: string
  ): Promise<APIResponse> {

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add the Cookie header only when the test explicitly
    // provides an authentication value.
    if (authHeader !== undefined) {
      headers.Cookie = authHeader;
    }

    return this.request.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers,
    });
  }

  /**
   * Partially updates an existing booking.
   *
   * Authentication is required for this operation.
   */
  async partialUpdateBooking(
    bookingId: number,
    bookingData: Partial<BookingData>
  ): Promise<APIResponse> {
    return this.request.patch(`/booking/${bookingId}`, {
      data: bookingData,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Deletes an existing booking.
   *
   * Authentication is required for this operation.
   */
  async deleteBooking(
    bookingId: number
  ): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Builds the authorization header required by
   * authenticated Booking API operations.
   */
  private getAuthHeaders(): Record<string, string> {

    if (!this.token) {
      throw new Error(
        'Authentication token is required for this operation.'
      );
    }

    return {
      Cookie: `token=${this.token}`,
    };
  }
}