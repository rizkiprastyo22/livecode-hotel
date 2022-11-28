import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { StringUtil } from './utils/string.util';



@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [
    CommonModule
  ],
  providers:[StringUtil],
  exports: [ValidationMessageComponent]
})
export class SharedModule { }
