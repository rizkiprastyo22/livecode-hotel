import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestBookComponent } from './guest-book.component';

const routes: Routes = [
  {
    path: '',
    component: GuestBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestBookRoutingModule { }
