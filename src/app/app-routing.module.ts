import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSeatsComponent } from './book-seats/book-seats.component';


const routes: Routes = [
    {
        path: 'book-seats',
        component: BookSeatsComponent,
        data: { title: 'Book Seats' }
    },
    { path: '',
        redirectTo: '/book-seats',
        pathMatch: 'full'
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
