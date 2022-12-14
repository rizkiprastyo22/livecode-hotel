import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightlyFee';
import { BOOK, Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // variabel penampung data reservasi
  private bookings: Book[] = []
  private booking!: Book

  // variabel storage
  private storage: Storage = sessionStorage

  constructor() {}

  // tampil semua
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

  // get by id
  get(id: number): Observable<Book>{
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        observer.next(this.bookings.find((b) => b.id == id) as Book) // penggunaan satu line kode ini saja hanya berlaku kalo cuma 1 page, kalo multipage harus ambil data dari session storage lagi
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  // simpan data
  save(booking: Book): Observable<void>{
    return new Observable<void>((observer: Observer<void>): void => {
      try {
        if(booking.id){
          this.bookings = this.bookings.map((b) => {
            if(b.id == booking.id) b = booking
              return b
            }         
          )
        }
        else{
          booking.id = this.bookings.length + 1
          this.bookings.push(booking)
          alert(`Tamu ${booking.reservee.name} telah melakukan pemesanan untuk kamar ${booking.roomNumber} selama ${booking.duration} malam dengan total tagihan sebesar Rp${NIGHTLY_FEE.R301}.`)
        }
        this.setToStorage()
        observer.next()
      } catch (error: any) {
        observer.error(error.message)      
      }
    })
  }

  checkIn(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        booking.status = 'checked-in'
        this.save(booking)
        alert(`Tamu ${booking.reservee.name} sudah check-in pada kamar ${booking.roomNumber}.`)
        observer.next()
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  checkOut(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        booking.status = 'checked-out'
        alert(`Tamu ${booking.reservee.name} sudah check-out dari kamar ${booking.roomNumber}.`)
        this.save(booking)
        observer.next()
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  // delete data
  remove(bookingId: number): Observable<void>{
    return new Observable<void>((observer: Observer<void>): void => {
      try {
        for(let i = 0; i < this.bookings.length; i++) {
          if(this.bookings[i].id === bookingId) {
            if(this.bookings[i].status !== 'checked-out'){
              alert(`Data pemesanan tidak dapat di hapus karena tamu ${this.bookings[i].reservee.name} belum checkout.`)
            }
            else{
              this.bookings.splice(i, 1)
            }
            this.setToStorage()
            observer.next()
          }
        } 
      }
      catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  setToStorage(): void{
    this.storage.setItem(BOOK, JSON.stringify(this.bookings))
  }
}
