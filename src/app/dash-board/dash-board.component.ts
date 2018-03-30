import { Component, OnInit } from '@angular/core';
import { Location } from '../models/chat';
import { ChatService } from '../chat.service';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
	doctor;
	registerToken;
	num : string;
	notification;
  constructor(private chatService : ChatService,private ds : DataService,private router : Router) {
	
  }

  ngOnInit() {
	if(localStorage.getItem('registerToken') == null){
		this.chatService.getPermission();
		this.chatService.receiveMessage();
		this.notification = this.chatService.currentMessage;
	}
  }
 	
	ChatRoom(){	
		/*console.log('chat room created');
		this.ds.getUser().subscribe(res => {
			this.num = res.data.user[0].number;
			this.chatService.createRoom(this.num);
		});*/
		this.router.navigate(['/chatRooms']);
	}
	
	Ambulance(){
		this.router.navigate(['/ambulance-requests']);
		/*console.log('Ambulance montitoring switched on');
		this.chatService.createAmbulance('9922129496');*/
	}
}
