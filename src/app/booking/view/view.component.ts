import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/booking.service';
import { Booking } from 'src/app/shared/booking';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
list:Booking[];
Arr=[];
rows:number;
  constructor(private service:BookingService) { 
    this.list=this.service.seatlist;
    this.rows=this.service.rows;}

 
  ngOnInit() {
  }

  counter(i: number) {
    return new Array(i);
}
}
