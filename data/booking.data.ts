export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export const validBookingData: BookingData = {
  firstname: 'Francis',
  lastname: 'Dias',
  totalprice: 250,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-20',
    checkout: '2026-08-25',
  },
  additionalneeds: 'Breakfast',
};