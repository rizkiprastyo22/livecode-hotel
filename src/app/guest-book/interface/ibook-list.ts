import { Book } from '../model/book';

export interface IbookList {
  bookings: Book[]
  onReserve(booking: Book): void
  onCheckIn(booking: Book): void
  onCheckOut(booking: Book): void
  onDeleteReservation(bookingId: number): void
}
