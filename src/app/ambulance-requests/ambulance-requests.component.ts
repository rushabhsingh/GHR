import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ambulance-requests',
  templateUrl: './ambulance-requests.component.html',
  styleUrls: ['./ambulance-requests.component.css']
})
export class AmbulanceRequestsComponent implements OnInit {
	currentNumber;
	lat;
	lon;
	requests;
	currentTime;
	requestsReal = [];
  constructor(private chatService : ChatService,private ds : DataService,private router : Router) { }

  ngOnInit() {
		
	   if(localStorage.getItem('requests') != null){
		this.requests = JSON.parse(localStorage.getItem('requests'));
		this.ds.getCurrentTime().subscribe(res => {
			this.currentTime = res.currentTime;
			for(var i = 0;i<this.requests.length;i++) {
			   if( (this.requests[i].time + 7200000) > (this.currentTime) ){
				   this.requestsReal.push(this.requests[i]);
			   }
			}
			localStorage.setItem('requests',JSON.stringify(this.requestsReal));
		});
	  }
  }
	openChatRoom(room : string){
	 this.router.navigate(['/acceptReject', room]); 
  }
  sendNotification(){
	  var ref = this.chatService;
	  var dsref = this.ds;
	  this.ds.getUser().subscribe(res => {
		  this.currentNumber = res.data.user[0].number;
		  navigator.geolocation.getCurrentPosition((position) => {
			ref.notifyAmbulance(this.currentNumber,position.coords.latitude,position.coords.longitude);	
			const data = {
				topic : 'ambulance',
				number : this.currentNumber,
				lat : position.coords.latitude,
				lon : position.coords.longitude
			};
			dsref.sendNoti(data).subscribe(res => {
				console.log(res);
				this.router.navigate(['/acceptReject',this.currentNumber]);
			});
		  });
	  });
	}
}
