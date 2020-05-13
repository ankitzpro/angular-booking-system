import { Injectable } from '@angular/core';
import { Booking } from './booking';
import { Observable } from 'rxjs';import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private toastr: ToastrService) {
    this.rows=1;
    for(var i=1;i<=80;i++)
    {
  if(i==10||i==11||i==20||i==23||i==25||i==40||i==42||i==55||i==70||i==75||i==78||i==60){
    this.seatlist.push({seat_no:i,row:this.rows,availability:'Not available',booked_by:''});
  }
  else{
    this.seatlist.push({seat_no:i,row:this.rows,availability:'Available',booked_by:''});
  }
  if(i%7==0){
    this.rows++;
  }
}
  }

seatlist:Booking[]=[];
rows:number;

seatsperrow=[];
diffArray=[];
  
seatBook(data){

 var name=data.name;
 var noofseats=data.noofseats;
   var vacant_seats=0;
   var row=0;
   var fixed=0;
   var findfixed=0;

   var seats=this.continousSeats(noofseats,name);
   
   if(seats>0){
for( var e=1;e<=this.rows;e++){
     for(var c=0;c<this.seatlist.length;c++){
      if(this.seatlist[c].row==e && this.seatlist[c].availability=='Available'){
        row=e;
        fixed=+fixed+1;
        }
      }
      if(noofseats==fixed){
        findfixed=1;
        break;
        }
        
     fixed=0;
   }
  
   
   if(findfixed!=1 ){
   for(var i=0;i<this.seatlist.length;i++){
     row=this.seatlist[i].row;
     if(this.seatlist[i].availability=='Available'){
       vacant_seats=+vacant_seats+1;
     }
     if(vacant_seats==noofseats){
       break;
     }
     if((i+1)%7==0 && i>1){
       vacant_seats=0;
     }
   }
  }
  else{
    vacant_seats=fixed;
  }
   if(vacant_seats==noofseats){
  for(var i=0;i<this.seatlist.length;i++){

    if(this.seatlist[i].row==row && noofseats>0 &&this.seatlist[i].availability=='Available'){
      this.seatlist[i].availability='Booked';
      this.seatlist[i].booked_by=name;
      noofseats=noofseats-1;
      
    }
  }
}

  if(noofseats>0){
    return this.nearestSeats(noofseats,name);
  }
  else{
    return 1;
    //this.toastr.success('Seats Booked Sucessfully');
  }
}
else{
  return 1;
  //this.toastr.success('Seats Booked Sucessfully');
}

}

nearestSeats(noofseats:number,name:string){
this.seatsperrow=[];
this.diffArray=[];
var totseats=0
  for(var j=1;j<=this.rows;j++){
    var row=j;
    var seats=0;
  for(var i=0;i<this.seatlist.length;i++){
      if(this.seatlist[i].row==j && this.seatlist[i].availability=='Available'){
        seats=seats+1;
        totseats=totseats+1
      }
    }
    this.seatsperrow.push({rowno:row,seatsavail:seats});
  }

this.seatsperrow.sort((a,b)=>b.seatsavail-a.seatsavail);


  if(noofseats<=totseats){
  for(var k=0;k<this.rows;k++){
var row1=this.seatsperrow[k].rowno;
    var diff=12;
  for(var l=0;l<this.rows;l++){
    var row2=this.seatsperrow[l].rowno;
if(this.seatsperrow[l].seatsavail>0 && row1!=row2){

    var a=Math.abs(row1-row2);
    if(diff>a)
      diff=a;
 }
  }
  this.diffArray.push({row:row1,diff:diff});
}
this.diffArray.sort((a,b)=>a.diff-b.diff);


  var highrow= this.diffArray[0].row;
  var lowrow= this.diffArray[0].row;
 for(var i=0;i<this.rows;i++){
   if(noofseats>0){
    for(var m=80;m--;){
      if(this.seatlist[m].row==lowrow) {
       if(this.seatlist[m].availability=='Available' && noofseats>0){
        this.seatlist[m].availability='Booked';
        this.seatlist[m].booked_by=name;
        noofseats=noofseats-1;
      }
     }
     }
    for(var j=0;j<this.seatlist.length;j++){
      if(this.seatlist[j].row==highrow ) {
       if(this.seatlist[j].availability=='Available' && noofseats>0){
        this.seatlist[j].availability='Booked';
        this.seatlist[j].booked_by=name;
        noofseats=noofseats-1;
      }
     }
     }
  
   
 
 highrow=highrow+1;
 lowrow=lowrow-1;
}
else{
  break;
}}
return 1;
//this.toastr.success('Seats Booked Sucessfully');
}
else{
  return 2;
  //this.toastr.warning(noofseats+' seats are not available in the coach');
}
}

continousSeats(noofseats:number,name:string){

  var seats=noofseats;
  var diff=0;
  var lastbookedseat=0;
  for( var b=1;b<=this.rows;b++){
    for(var d=0;d<this.seatlist.length;d++){
      if(this.seatlist[d].row==b ){

      if(((d+1)%7==0 && d!=0) || (d+1==80)){

        diff=(this.seatlist[d].seat_no)-lastbookedseat;
        if(diff==noofseats){
        break;
        }
        lastbookedseat=this.seatlist[d].seat_no;
      }
      diff=0;
       if( this.seatlist[d].availability!='Available'){
    diff=(this.seatlist[d].seat_no)-lastbookedseat-1;
    if(diff==noofseats){
    break;
    }
    lastbookedseat=this.seatlist[d].seat_no;
    }
}
}
  if(diff==noofseats){
    break;
  }
}

if(diff==noofseats){
  for(var i=0;i<noofseats;i++){
  this.seatlist[lastbookedseat+i].availability='Booked';
  this.seatlist[lastbookedseat+i].booked_by=name;
  seats=seats-1;
  }
}
return seats;
    
}

}