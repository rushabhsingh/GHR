import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data-service.service';
declare var $ : any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	
	user : any;
	constructor(private router : Router,private dataService : DataService) {
	}
  
  ngOnInit(){
	  var userType;
	  var sentOtp;
	  var number;
	  var pass;
	  var name;
	  var rtr = this.router;
	  $(".form").css('display',"block");
	 $(".otp").css('display','none');
	  var ref = this.dataService;
	  $("button[name='submit']").click(function(){
		
		name = $("input[name='username']").val();
		number = $("input[name='phone']").val();
		pass = $("input[name='password']").val();
		userType = $("#exampleSelect1 option:selected").text();
		alert(userType);
		var regex1= /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
		var flag = regex1.test(number);
		if(flag == false){
			alert('Invalid Phone Number');
		}else{
			if(pass.length < 10){
				alert("Password must contain more than 9 characters");
			}
			else{
				var email = {
				 email : number 
				 };
				ref.sendSMS(email).subscribe((result) => {
					if(result == 'failure'){
						alert('Message was not sent, please try again later');
					}
					else
					{
						sentOtp = result;
						console.log(result);
					 $(".otp").css('display',"block");
						 $(".form").css('display','none');
					}
				});
			}
		}
	  });
	  
	  $("button[name='register']").click(function(){
		 if($("input[name='otp']").val() == sentOtp){
			console.log(userType);
			const user = {
				name : name,
				pass : pass,
				number : number,
				userType : userType
			};
			switch(userType){
				case 'Doctor' :
					ref.verifyDoctor(user).subscribe(result => {
					  if(result.result == "failure"){
						alert(result.message);
						
						$(".form").css('display',"block");
						$(".otp").css('display','none');
						rtr.navigate(['/registration']);   
					   }
					   else{
						  rtr.navigate(['/login']);   
					   }
					});
					break;
				case 'Ambulance' : 
					ref.verifyAmbulance(user).subscribe(result => {
						if(result.result == "failure"){
						alert(result.message);
						$(".form").css('display',"block");
						$(".otp").css('display','none');
						rtr.navigate(['/registration']);   
					   }
					   else{
						  rtr.navigate(['/login']);   
					   }
					});
					break;
				case 'Police' :
					ref.verifyPolice(user).subscribe(result => {
						if(result.result == "failure"){
						alert(result.message);
						$(".form").css('display',"block");
						$(".otp").css('display','none');
						rtr.navigate(['/registration']);   
					   }
					   else{
						  rtr.navigate(['/login']);   
					   }
					});
					break;
				default : 
					ref.addUser(user).subscribe(result => {
						if(result.result == "failure"){
						alert(result.message);
						$(".form").css('display',"block");
						$(".otp").css('display','none');
						rtr.navigate(['/registration']);   
					   }
					   else{
						  rtr.navigate(['/login']);   
					   }
					});
					break;
			}
		
		}
		else{
			alert('Incorrect Otp');
		}
	  });
  }
  
}
