import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BOOK, Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // variabel penampung data reservasi
  private bookings: Book[] = []

  // variabel storage
  private storage: Storage = sessionStorage

  constructor() {}

  list(): Observable<Book[]>{
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      const sessionBookings = this.storage.getItem(BOOK) as string
      try {
        if(!sessionBookings){
          const bookings: Book[] = [
            {
              id: 1,
              status: 'reserved',
              roomNumber: 'R301',
              duration: 2, // dalam satuan malam, jika 2 berarti 2 malam menginap.
              guestCount: 2, // jumlah tamu yang menginap dalam 1 kamar
              reservee: 
              {
                id: 1,
                name: 'Rizki Prastyo',
                email: 'rizki@gmail.com',
                phone: '082784728736'
              }
            },
            {
              id: 2,
              status: 'checked-in',
              roomNumber: 'R302',
              duration: 1, // dalam satuan malam, jika 2 berarti 2 malam menginap.
              guestCount: 2, // jumlah tamu yang menginap dalam 1 kamar
              reservee: 
              {
                id: 1,
                name: 'Rizki Prastyo',
                email: 'rizki@gmail.com',
                phone: '082784728736'
              }
            },
            {
              id: 3,
              status: 'checked-out',
              roomNumber: 'R303',
              duration: 1, // dalam satuan malam, jika 2 berarti 2 malam menginap.
              guestCount: 2, // jumlah tamu yang menginap dalam 1 kamar
              reservee: 
              {
                id: 1,
                name: 'Rizki Prastyo',
                email: 'rizki@gmail.com',
                phone: '082784728736'
              }
            }
          ]
          this.bookings = bookings
          observer.next(this.bookings)
        }
        else{
          this.bookings = JSON.parse(sessionBookings)
          observer.next(this.bookings)
        }
        this.setToStorage()
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  setToStorage(): void{
    this.storage.setItem(BOOK, JSON.stringify(this.bookings))
  }
}
