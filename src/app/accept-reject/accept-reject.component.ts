import { Component, OnInit } from '@angular/core';
import { Location } from '../models/chat';
import { ChatService } from '../chat.service';
import { DataService } from '../data-service.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var google : any;
declare var $ : any;

@Component({
  selector: 'app-accept-reject',
  templateUrl: './accept-reject.component.html',
  styleUrls: ['./accept-reject.component.css']
})
export class AcceptRejectComponent implements OnInit {

	placeMarker($event){
    
		var origin = new google.maps.LatLng($event.coords.lat,$event.coords.lng);
		var destination = new google.maps.LatLng(this.victimLatitude,this.victimLongitude);
		var service = new google.maps.DistanceMatrixService();

		var date = new Date();
		date.setDate(date.getDate() + 1);
		var DrivingOptions = {
		departureTime: date,

		};

		service.getDistanceMatrix(
		  {
			origins: [origin],
			destinations: [destination],
			travelMode: 'DRIVING',
			drivingOptions : DrivingOptions,
			unitSystem: google.maps.UnitSystem.METRIC,
			durationInTraffic: true,
			avoidHighways: false,
			avoidTolls: false
		  }, response_data);

		  function response_data(responseDis, status)
		   {
				if (status !== google.maps.DistanceMatrixStatus.OK || status != "OK")
				{
				console.log('Error:', status);
				}
				else
				{
					$(".distance").html(responseDis.rows[0].elements[0].distance.text);
				}
			}

	}
  
	
	currentLongitude;
	currentLatitude;
    victimLabel = {
	color: 'green',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'V',
	};
	rejectLabel = {
	color: 'black',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'R',
	};
	acceptLabel = {
	color: 'yellow',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'A',
	};
	
	youLabel = {
	color: 'blue',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'U',
	};
	
	loc : Location;
	locations : Location[];
	locCount;
	maptype = 'roadmap';
	requests;
	number;
	currentTime;
	flag;
	currentUser;
	owner : boolean = false;
	victim;
	victimLatitude;
	victimLongitude;
	
	getVictimLocation(number){
	  this.chatService.getVictimLocation(number).subscribe(res => {
		  this.victimLatitude = res.latitude;
		  this.victimLongitude = res.longitude;
		});
	}
	constructor(private route: ActivatedRoute,private chatService : ChatService, private ds: DataService,private router : Router){
	this.route.params.subscribe(params => {
       this.number = params['number']; // (+) converts string 'id' to a number
		this.getVictimLocation(this.number);
		
	   this.ds.getUser().subscribe(res => {
			this.currentUser = res.data.user[0].number;
			if(this.number != res.data.user[0].number){
				if(res.data.user[0].userType != 'Ambulance'){
					alert('You cant access this page');
					this.router.navigate(['/ambulance-requests']);
				}else{
					this.chatService.addLocation(this.number,res.data.user[0].number);
				}
			}else{
				this.owner = true;
			}
		});
		
		this.ds.getSpecific(this.number).subscribe(res => {
			this.victim = res.user[0];
		});
		
		
		if(localStorage.getItem('requests') == null){
			this.requests = [];
			this.ds.getCurrentTime().subscribe(res => {
				this.currentTime = res.currentTime;
				console.log(this.currentTime);
				this.requests.push({number : this.number, time : this.currentTime});
				localStorage.setItem('requests',JSON.stringify(this.requests));
		
			});
		}
		else{
			this.requests = JSON.parse(localStorage.getItem("requests"));
			for(var i=0;i < this.requests.length; i++ ){
				if(this.requests[i].number == this.number){
					this.flag = false;
					break;
				}
			}
			if(this.flag == true){
				this.ds.getCurrentTime().subscribe(res => {
					this.currentTime = res.currentTime;
					console.log(this.currentTime);
					this.requests.push({number : this.number, time : this.currentTime});
					localStorage.setItem('requests',JSON.stringify(this.requests));
			
				});
			}
		}
		this.chatService.getLocations(this.number).subscribe(res => {
			this.locations = res;
		});
	});
  }
  
  profile(username : string){
	  this.router.navigate(['/profile',username]);
  }
  
	getLocation(){
			
			/*this.chatService.getLocationByid('token2').subscribe((loc : Location) => {
				this.chatService.updateLocation('token2',loc.latitude,loc.longitude);
			});*/ 
		 }
		 
  ngOnInit() {
	   const ref = this.chatService;
		navigator.geolocation.getCurrentPosition((position) => {
			this.currentLatitude = position.coords.latitude;
			this.currentLongitude = position.coords.longitude;
		});
	  
	  /*this.chatService.getLocations().subscribe(locations => {
			this.locations =  locations;
			this.locCount = this.locations.length;
	 });
	  */
	 
	 
	 //setInterval(() => {this.getLocation()}, 3000000);
  }

	reply(res : boolean){
		if(res == true){
			this.chatService.insertAccept(this.number,this.currentUser);
		}
		else{
			this.chatService.insertReject(this.number,this.currentUser);
		}
	}
}
