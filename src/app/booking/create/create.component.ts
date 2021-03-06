
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../shared/booking.service';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: BookingService,
    public formBuilder: FormBuilder,private toastr: ToastrService) { }

    public todos : FormGroup;
    submitted = false;
  ngOnInit() {
    this.createForm();
  }
  get f() { return this.todos.controls; }

  createForm(){
    this.todos  = this.formBuilder.group({
     name: ['', Validators.required],
     noofseats:['',Validators.required]
   });
   }
   onSubmit(){
    this.submitted = true;
    if (this.todos.invalid) {
          return;
        }
        if(this.todos.controls['noofseats'].value>7){
          this.toastr.warning('Cannot Book more than 7 seats');
          return;
        }
        var formData=this.todos.value;
        var result =this.service.seatBook(formData);
        if(result==1){
          this.toastr.success('Seats Booked Sucessfully');
this.todos.reset();
        }
        else{
        this.toastr.warning(this.todos.controls['noofseats'].value+' seats are not available in the coach');
        }
   }

}