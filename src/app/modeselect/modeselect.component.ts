import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modeselect',
  templateUrl: './modeselect.component.html',
  styleUrls: ['./modeselect.component.css']
})
export class ModeselectComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  
  setMode(mode : string){
		localStorage.setItem('mode',mode);
		this.router.navigate(['/register']);
	}
	
	doctor(){
		this.router.navigate(['/registerDoctor']);
	}

}
