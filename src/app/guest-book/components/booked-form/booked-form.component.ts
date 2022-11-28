import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { IbookForm } from '../../interface/ibook-form';
import { Book } from '../../model/book';
import { HotelService } from '../../service/hotel-service.service';

@Component({
  selector: 'app-booked-form',
  templateUrl: './booked-form.component.html',
  styleUrls: ['./booked-form.component.scss']
})
export class BookedFormComponent implements OnInit, IbookForm{

  booking?: Book | undefined;

  constructor(
    private hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

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

  ngOnInit() {
  }


}
