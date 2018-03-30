import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DataService } from '../data-service.service';
import {Router} from '@angular/router';
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private dataService: DataService,private router : Router) {}

  canActivate() {
	  if(this.dataService.isLoggedIn())
	  {
		return true;  
	  }
	  else{
		  alert("You are not logged In");
		this.router.navigate(['/login']);
		return false;  
	  }
  }
}