import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../data-service.service';
import {ChatService} from '../chat.service';
@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {
	chatRooms = [];
	currentUser;
	temp :number= 0;
	docs;
	chats;
	currentTime;
  constructor(private chatService: ChatService,private router : Router,private ds : DataService) { }

  ngOnInit() {
	  
	  if(localStorage.getItem('chatRooms') != null){
		this.chats = JSON.parse(localStorage.getItem('chatRooms'));
		this.ds.getCurrentTime().subscribe(res => {
			this.currentTime = res.currentTime;
			for(var i = 0;i<this.chats.length;i++) {
			   if( (this.chats[i].time + 7200000) > (this.currentTime) ){
				   this.chatRooms.push(this.chats[i]);
			   }
			}
			localStorage.setItem('chatRooms',JSON.stringify(this.chatRooms));
		});
	  }
	}
  
  openChatRoom(room : string){
	 this.router.navigate(['/chat', room]); 
  }
	
	createRoom(){
		this.ds.getUser().subscribe(res => {
			this.currentUser = res.data.user[0].number;
			this.ds.setTimerChatRoom({number : this.currentUser}).subscribe(res => {
				console.log(res);
			});
			this.chatService.createRoom(this.currentUser);
			if(localStorage.getItem('chatRooms') == null){
				this.chatRooms = [];
				if(this.chatRooms.indexOf(this.currentUser) == -1)
				{
					this.ds.getCurrentTime().subscribe(res => {
						this.currentTime = res.currentTime;
						console.log(this.currentTime);
						this.chatRooms.push({number : this.currentUser, time : this.currentTime});
						localStorage.setItem('chatRooms',JSON.stringify(this.chatRooms));
				
					});
				}
			}
			else{
				this.chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
				if(this.chatRooms.indexOf(this.currentUser) == -1)
				{
					this.ds.getCurrentTime().subscribe(res => {
						this.currentTime = res.currentTime;
						console.log(this.currentTime);
						this.chatRooms.push({number : this.currentUser, time : this.currentTime});
						localStorage.setItem('chatRooms',JSON.stringify(this.chatRooms));
				
					});	
				}
			}
			this.router.navigate(['/chat', this.currentUser]);
		});
	}
}
