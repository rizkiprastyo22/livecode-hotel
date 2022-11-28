import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit{

  bookings: Book[] = []

  constructor(
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelService.list().subscribe({
      next: (bookings: Book[]) => {
        this.bookings = bookings
        console.log('isi bookings: ', this.bookings)   
      }
    })
  }

}
