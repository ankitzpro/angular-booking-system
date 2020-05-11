
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/booking.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: BookingService,
    private firestore: AngularFirestore,public formBuilder: FormBuilder,private toastr: ToastrService) { }

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
        this.service.seatBook(formData);
   }

}