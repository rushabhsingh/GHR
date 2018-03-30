import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';
import {DataService} from './data-service.service';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private router : Router,private ds : DataService){
	  
  }
  
  ngOnInit(){
	  

		$("#menu-toggle").click(function(e) {
		  e.preventDefault();
		  $("#wrapper").toggleClass("toggled");
		});

		$('#login,#update,#register,#about,#profilename,#dashboard').click(function(e)
		{
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
		});

	  
  }
  
  logout(){
	  
	  localStorage.removeItem('token');
	  this.router.navigate(['/login']);
  }
  
  profile(){
	  var rtr = this.router;
	  this.ds.getUser().subscribe(res => {
		  if(res.result){
			  rtr.navigate(['/profile',res.data.user[0].number]);
		  }else{
			  alert("You are not logged In!");
		  }
	  });
  }
  
}
