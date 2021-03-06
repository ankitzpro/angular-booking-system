import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../shared/booking';
import { BookingService } from '../../../shared/booking.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
list:Booking[];
rows:number;
  constructor(private service:BookingService) { 
    this.list=this.service.seatlist;
    this.rows=this.service.rows;}

 
  ngOnInit() {
  }

}
