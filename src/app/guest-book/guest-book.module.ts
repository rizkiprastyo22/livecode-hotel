import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestBookComponent } from './guest-book.component';
import { BookedListComponent } from './components/booked-list/booked-list.component';
import { BookedFormComponent } from './components/booked-form/booked-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestBookRoutingModule } from './guest-book-routing';
import { HotelService } from './service/hotel-service.service';
import { SharedModule } from '../shared/shared.module';

const components = [
  GuestBookComponent,
  BookedListComponent,
  BookedFormComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    GuestBookRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[HotelService],
  exports:[GuestBookComponent]
})
export class GuestBookModule { }
