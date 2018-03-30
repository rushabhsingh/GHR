import { Component, OnInit } from '@angular/core';
import {DataService} from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user = false;
	number;
  constructor(private ds: DataService,private route : ActivatedRoute) { }

  ngOnInit() {
	this.route.params.subscribe(number => {
	  this.number = number;
	  this.ds.getSpecifiedUser(this.number).subscribe(res => {
		 this.user = res.user[0];
	  });
	});
  }
}
