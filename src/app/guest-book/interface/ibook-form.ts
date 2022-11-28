import { Book } from "../model/book";
import { FormGroup } from '@angular/forms'

export interface IbookForm {
  booking?: Book;
  bookingGroup: FormGroup;
  onSubmitReservation(): void;
  onFormReset(): void;
}
