import { Component, OnInit } from '@angular/core';
import { IbookList } from '../../interface/ibook-list';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightlyFee';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit, IbookList{

  bookings: Book[] = []

  NIGHTLY_FEE = NIGHTLY_FEE

  constructor(
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelService.list().subscribe({
      next: (bookings: Book[]) => {
        this.bookings = bookings
        // console.log('isi bookings: ', this.bookings)   
      }
    })
  }

  onReserve(booking: Book): void {
    // this.hotelService.get(booking.id).subscribe()
  }

  onCheckIn(booking: Book){
    this.hotelService.checkIn(booking).subscribe()
  }

  onCheckOut(booking: Book){
    this.hotelService.checkOut(booking).subscribe()
  }

  onDeleteReservation(bookingId: number): void{
    this.hotelService.remove(bookingId).subscribe()
  }
}
