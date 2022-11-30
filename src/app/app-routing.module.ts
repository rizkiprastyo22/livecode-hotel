import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuard } from './shared/guard/router.guard';

const routes: Routes = [
  {
    path: 'guest-book',
    canActivate: [RouterGuard],
    canActivateChild: [RouterGuard],
    loadChildren: () => import('./guest-book/guest-book.module').then(m => m.GuestBookModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: '/guest-book',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/guest-book'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
