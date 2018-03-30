import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute,Router } from '@angular/router';

declare var google : any;
declare var $ : any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
	
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
  
	currentLatitude;
	currentLongitude;
	victimLatitude;
	victimLongitude;
	number;
	victimLabel = {
	color: 'green',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'V',
	};
	youLabel = {
	color: 'blue',
	fontFamily: '',
	fontSize: '18px',
	fontWeight: 'bold',
	text: 'U',
	};
	maptype = "roadmap";
	messages;
  constructor(private router : Router,private route : ActivatedRoute,private chatService : ChatService) { }

  ngOnInit() {
	  this.route.params.subscribe(params => {
       this.number = params['number']; 
		
		this.getVictimLocation(this.number);
	});
	  
	  const ref = this.chatService;
		navigator.geolocation.getCurrentPosition((position) => {
			this.currentLatitude = position.coords.latitude;
			this.currentLongitude = position.coords.longitude;
		});
		
		this.chatService.getChatRoomMessages(this.number).subscribe(res => {
			this.messages = res;
		});
		
  }
  getVictimLocation(number){
	  this.chatService.getVictimLocation(number).subscribe(res => {
		  this.victimLatitude = res.latitude;
		  this.victimLongitude = res.longitude;
		});
  }
profile(username : string){
	  this.router.navigate(['profile',username]);
  }
}
