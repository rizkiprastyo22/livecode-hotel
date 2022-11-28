import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IbookForm } from '../../interface/ibook-form';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';

@Component({
  selector: 'app-booked-form',
  templateUrl: './booked-form.component.html',
  styleUrls: ['./booked-form.component.scss']
})
export class BookedFormComponent implements OnInit, IbookForm{

  booking!: Book;

  constructor(
    private hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params
        this.hotelService.get(+id).subscribe({
          next: (booking: Book) => {
            this.booking = booking
            this.setFormValue(this.booking) 
          }
        })
        
      }
    })
  }

  ngOnChanges(): void{
    this.setFormValue(this.booking)
  }

  // form group reservation
  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    status: new FormControl('reserved'),
    roomNumber: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    guestCount: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  })

  // validation
  isFormValid(bookingField: string): boolean {
    const control: AbstractControl = this.bookingGroup.get(bookingField) as AbstractControl
    return(control && control.invalid && (control.dirty || control.touched))
  }

  setFormValue(booking: Book){
    if(booking){
      this.bookingGroup.controls['id']?.setValue(booking.id)
      this.bookingGroup.controls['status']?.setValue(booking.status)
      this.bookingGroup.controls['roomNumber']?.setValue(booking.roomNumber)
      this.bookingGroup.controls['duration']?.setValue(booking.duration)
      this.bookingGroup.controls['guestCount']?.setValue(booking.guestCount)
      this.bookingGroup.controls['name']?.setValue(booking.reservee.name)
      this.bookingGroup.controls['email']?.setValue(booking.reservee.email)
      this.bookingGroup.controls['phone']?.setValue(booking.reservee.phone)
    }
  }

  // submit form
  onSubmitReservation() {
    const { id, status, roomNumber, duration, guestCount, name, email, phone } = this.bookingGroup.value
    // console.log(id, status, roomNumber, duration, guestCount, name, email, phone)   
    this.hotelService.save({
      id,
      status,
      roomNumber,
      duration,
      guestCount,
      reservee:
      {
        id: 1,
        name: name,
        email: email,
        phone: phone
      }
    }).subscribe()
    this.onFormReset()
    this.router.navigateByUrl('guest-book')
  }

  onFormReset(){
    this.bookingGroup.reset()
  }


}
