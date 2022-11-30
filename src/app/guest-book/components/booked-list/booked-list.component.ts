import { Component, OnInit } from '@angular/core';
import { IbookList } from '../../interface/ibook-list';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightlyFee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit, IbookList{

  bookings: Book[] = []

  NIGHTLY_FEE = NIGHTLY_FEE

  constructor(
    private hotelService: HotelService,
    private router: Router
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

  onCheckIn(bookingId: number){
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if(booking.status != 'reserved'){
          alert(`Tamu ${booking.reservee.name} harus melakukan reservasi dulu sebelum check-in`)
        }
        else{
          this.hotelService.checkIn(booking).subscribe()
        }
      }
    })
  }

  onCheckOut(bookingId: number){
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if(booking.status != 'checked-in'){
          alert(`Tamu ${booking.reservee.name} harus melakukan check-in dulu sebelum check-out`)
        }
        else{
          this.hotelService.checkOut(booking).subscribe()
        }
      }
    })   
  }

  onDeleteReservation(bookingId: number): void{
    this.hotelService.remove(bookingId).subscribe()
  }

  onLoggedIn(): boolean {
    return (sessionStorage.getItem('token') !== null)
  }

  onLoggedOut(): void {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login')
  }
}
