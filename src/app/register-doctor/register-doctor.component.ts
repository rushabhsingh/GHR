import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../data-service.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})

export class RegisterDoctorComponent implements OnInit {
	doctor : any;
	user : any;
	otp : string;
	verify : boolean = false;
	rForm: FormGroup;
	Form: FormGroup;
	post:any; 
	titleAlert:string = 'This field is required';
  
  constructor(private fb: FormBuilder,private router : Router,private dataService : DataService) {
	this.verify = false;
	var modetemp = localStorage.getItem('mode');
	this.Form = fb.group({
	  'otp' : [null, Validators.compose([Validators.required])],
	});
	this.rForm = fb.group({
	  'text' : [null,Validators.compose([Validators.required])],
	  'number' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
	  'pass' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])]
	});
	
  }
	ngOnInit() {
		
  }
  
  submitOtp(post){
	  if(post.otp == this.otp){
		   this.dataService.verifyDoctor(this.user).subscribe((result) => {
			   if(result.result == "failure"){
				   this.verify = false;
				   alert(result.message);
				this.router.navigate(['/registerDoctor']);   
			   }
			   else{
				  this.router.navigate(['/login']);   
			   }
		   });
		   
		}
	   else{
		   alert("Otp was incorrect");
	   }
  }
  
  
   addPost(post) {
	   this.user = {
		   name : post.text,
		   pass : post.pass,
		   number : post.number,
		   doctor : 'YES'
		};
		
		
	   var email = {
		 email : post.number
		};
		
		this.dataService.sendSMS(email).subscribe((result) => {
			if(result == 'failure'){
				alert('Message was not sent, please try again later');
			}
			else
			{
				console.log(result);
				this.otp = result;
				this.verify = true;
			}
		});
		
  }

}
