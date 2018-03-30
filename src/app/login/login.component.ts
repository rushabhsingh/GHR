import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data-service.service';
declare var $ : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private dataService : DataService) {
	
	
  }
	ngOnInit() {
		var number;
		var pass;
		var ref = this.dataService;
		var rtr = this.router;
	$("button[name='submit']").click(function(){
		number = $("input[name='phone']").val();
		pass = $("input[name='password']").val();
		var regex1= /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
		var flag = regex1.test(number);
		if(flag == false){
			alert("Invalid Phone number");
		}else{
			if(pass.length < 10){
				alert("Invalid Password");
			}
			else{
				const user = {
					number : number,
					pass : pass
				}
				ref.authenticateUser(user).subscribe(res => {
					if(res.result == 'failure'){
						alert("Either the password or the number is incorrect");
					}else{
						localStorage.setItem('token',res.token);
						rtr.navigate(['/dashboard']);
					}
				});
			}
		}
	});	
  }
  
}
