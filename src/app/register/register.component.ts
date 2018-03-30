import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	user : any;
	otp : string;
	verify : boolean = false;
	emal : boolean = false;
	phone : boolean = false;
	rForm: FormGroup;
	Form: FormGroup;
	post:any; 
	titleAlert:string = 'This field is required';
  
  constructor(private fb: FormBuilder,private router : Router,private dataService : DataService) {
	this.verify = false;
	console.log(this.verify);
	var modetemp = localStorage.getItem('mode');
	if(modetemp == 'email'){
		this.emal = true;
		this.rForm = fb.group({
		  'text' : [null,Validators.compose([Validators.required])],
		  'pass' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])]
		});
	}
	else{
		this.phone = true;
		this.rForm = fb.group({
		  'number' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
		  'pass' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])]
		});
	}
	this.Form = fb.group({
		  'otp' : [null, Validators.compose([Validators.required])],
		});
	
  }
	ngOnInit() {
		
  }
  
  submitOtp(post){
	  if(post.otp == this.otp){
		   if(this.emal){
			 this.dataService.addUserEmail(this.user).subscribe((result) => {
			   if(result.result == "failure"){
				this.verify = false;
				alert('This Email address is already taken');
				this.router.navigate(['/register']);   
			   }
			   else{
				  this.router.navigate(['/login']);   
			   }
		   });  
		   }
		   else{
			 this.dataService.addUser(this.user).subscribe((result) => {
			   if(result.result == "failure"){
				   this.verify = false;
				alert('This Phone number is already taken');
				this.router.navigate(['/register']);   
			   }
			   else{
				  this.router.navigate(['/login']);   
			   }
		   });   
		   }
		   
		}
	   else{
		   alert("Otp was incorrect");
	   }
  }
  
  
   addPost(post) {
	   
	   if(this.emal){
		this.user = {
			email : post.text,
		   pass : post.pass,
		   doctor : 'NO'
		};
		var email = {
		 email : post.text 
		};
	   }
	   else{
		   this.user = {
		   pass : post.pass,
		   number : post.number,
		   doctor : 'NO',
		};
		 var email = {
		 email : post.number 
		 };
	   }
	   
	   if(this.emal){
		this.dataService.sendMail(email).subscribe((result) => {
			if(result.result == 'failure'){
				console.log('OTP was not sent, please try again later'+result.err);
			}
			else
			{
				this.otp = result.otp;
				this.verify = true;
			}
		});
		   
	   }
	   if(this.phone){
		this.dataService.sendSMS(email).subscribe((result) => {
			if(result == 'failure'){
				alert('Message was not sent, please try again later');
			}
			else
			{
				this.otp = result;
				this.verify = true;
			}
		});   
	   }
  }

}
