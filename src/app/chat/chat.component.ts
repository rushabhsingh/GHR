import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat } from '../models/chat';
import { DataService } from '../data-service.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  notification;
  items : Chat[];
  username : string = '';
  message : string = '';
  count : Number = 0;
  registerToken : string;
  doctor : string;
  lat : any;
  lon : any;
	number : any;
	chatRooms;
	messages;
	newMessage;
	currentMessager;
	currentTime;
	flag : boolean = true;
  constructor(private route: ActivatedRoute,private chatService : ChatService, private ds: DataService,private router : Router){
	this.route.params.subscribe(params => {
       this.number = params['id']; // (+) converts string 'id' to a number
		this.ds.getUser().subscribe(res => {
			if(res.data.user[0].userType != 'Doctor' && this.number != res.data.user[0].number){
				alert('You cant access this page');
				this.router.navigate(['/chatRooms']);
			}
		});
		
		
		if(localStorage.getItem('chatRooms') == null){
			this.chatRooms = [];
			this.ds.getCurrentTime().subscribe(res => {
				this.currentTime = res.currentTime;
				console.log(this.currentTime);
				this.chatRooms.push({number : this.number, time : this.currentTime});
				localStorage.setItem('chatRooms',JSON.stringify(this.chatRooms));
		
			});
		}
		else{
			this.chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
			for(var i=0;i < this.chatRooms.length; i++ ){
				if(this.chatRooms[i].number == this.number){
					this.flag = false;
					break;
				}
			}
			if(this.flag == true){
				this.ds.getCurrentTime().subscribe(res => {
					this.currentTime = res.currentTime;
					console.log(this.currentTime);
					this.chatRooms.push({number : this.number, time : this.currentTime});
					localStorage.setItem('chatRooms',JSON.stringify(this.chatRooms));
			
				});
			}
		}
		this.chatService.getChatRoomMessages(this.number).subscribe(res => {
			this.messages = res;
		});
	});
  }
  
	
  ngOnInit(){
	this.newMessage = '';
	/*this.chatService.getItems().subscribe(itms => {
			this.items =  itms.reverse();
			this.count = this.items.length;
	  });
	*/
	
		
	/*this.chatService.getPosition().subscribe((pos: Position) => {
		alert(pos.coords.latitude);
		alert(pos.coords.longitude);
	});*/
	
	
	}
  profile(username : string){
	  this.router.navigate(['profile',username]);
  }
  
  send(){
	  this.ds.getUser().subscribe(res => {
		  this.currentMessager = res.data.user[0].number;
		  this.chatService.addMessage(this.number,this.currentMessager,this.newMessage,this.messages.length);
		  this.newMessage = ''; 
	  });
	}
  
  sendNotification(){
	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
			var body = {
			lat : position.coords.latitude,
			lon : position.coords.longitude
			}
			this.ds.sendNoti(body).subscribe(result => {
			console.log(result);
			});
		});
	}
  }
  
  
}
