import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
import * as $ from 'jquery/dist/jquery.min.js';
declare var $:any;


@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {


 
  constructor(private router : Router) { }
  
  ngOnInit() 
  {
   
  }
  
  hospital(){
	  window.location.href = '/nearby/nhospital';
  }
  police(){
	  window.location.href = '/nearby/npolice';
  }
  clinics(){
	  window.location.href = '/nearby/nclinics';
  }
  pharmacy(){
	  window.location.href = '/nearby/npharmacy';
  }
  

}

