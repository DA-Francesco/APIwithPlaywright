import { APIRequestContext } from '@playwright/test';
import { BookingData } from '../data/booking.data';

/**
 * API client responsible for all Booking endpoint operations.
 *
 * Public GET operations can be performed without authentication.
 * Update and delete operations require an authentication token.
 */
export class BookingClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly token?: string
  ) {}

  /**
   * Retrieves all available bookings.
   */
  async getAllBookings() {
    return await this.request.get('/booking');
  }

  /**
   * Retrieves a specific booking using its booking ID.
   */
  async getBookingById(bookingId: number) {
    return await this.request.get(`/booking/${bookingId}`);
  }

  /**
   * Creates a new booking.
   */
  async createBooking(bookingData: BookingData) {
    return await this.request.post('/booking', {
      data: bookingData,
    });
  }

  /**
   * Completely replaces an existing booking.
   *
   * Restful Booker requires authentication for this operation.
   */
  async updateBooking(bookingId: number, bookingData: BookingData) {
    return await this.request.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Partially updates an existing booking.
   */
  async partialUpdateBooking(
    bookingId: number,
    bookingData: Partial<BookingData>
  ) {
    return await this.request.patch(`/booking/${bookingId}`, {
      data: bookingData,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Deletes an existing booking.
   */
  async deleteBooking(bookingId: number) {
    return await this.request.delete(`/booking/${bookingId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Builds the authorization header required by authenticated
   * Booking API operations.
   */
  private getAuthHeaders() {
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