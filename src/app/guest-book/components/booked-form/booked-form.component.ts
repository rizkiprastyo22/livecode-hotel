import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';

@Component({
  selector: 'app-booked-form',
  templateUrl: './booked-form.component.html',
  styleUrls: ['./booked-form.component.scss']
})
export class BookedFormComponent implements OnInit{
  bookings: Book[] = []

  constructor(
    private hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  // form group reservation
  bookingForm: FormGroup = new FormGroup({
    id: new FormControl(),
    status: new FormControl('', [Validators.required]),
    roomNumber: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    guestCount: new FormControl('', [Validators.required]),
    guestId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  })

  // validation
  isFormValid(bookingField: string): boolean {
    const control: AbstractControl = this.bookingForm.get(bookingField) as AbstractControl
    return(control && control.invalid && (control.dirty || control.touched))
  }

  // submit form
  onSubmit() {
    const { id, status, roomNumber, duration, guestCount, name, email, phone } = this.bookingForm.value
    // console.log(id, status, roomNumber, duration, guestCount, name, email, phone)   
    this.hotelService.save({
      id,
      status,
      roomNumber,
      duration,
      guestCount,
      reservee:
      {
        name: name,
        email: email,
        phone: phone
      }
    }).subscribe()
    // this.bookingForm.reset()
    this.router.navigateByUrl('guest-book')
  }

  ngOnInit() {
  }


}
