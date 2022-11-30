import { Book } from '../model/book';

export interface IbookList {
  bookings: Book[]
  onReserve(booking: Book): void
  onCheckIn(bookingId: number): void
  onCheckOut(bookingId: number): void
  onDeleteReservation(bookingId: number): void
}
