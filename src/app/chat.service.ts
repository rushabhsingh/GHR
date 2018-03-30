
import { AngularFirestore , AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Chat } from '../app/models/chat';
import { Location } from '../app/models/chat';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { DataService } from './data-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
interface Item {
	id : string;
	name : string;
}

@Injectable()
export class ChatService {
  itemsCollection : AngularFirestoreCollection<Chat>;
  locationCollection : AngularFirestoreCollection<Location>;
	items : Observable<Chat[]>;
	locations : Observable<Location[]>;
	d;
	data;
  constructor(private ds : DataService,private database : AngularFirestore,private db: AngularFireDatabase, private afAuth: AngularFireAuth ) {
	this.d = this.database.collection('database');
	this.data = this.d.valueChanges();
	/*this.itemsCollection = this.database.collection('chat');
	this.items = this.itemsCollection.valueChanges();
	this.locationCollection = this.database.collection('ambulance-locations');
	this.locations = this.locationCollection.valueChanges();*/
		
  }
  getVictimLocation(number : string){
	 return this.d.doc(number).collection('ambulances').doc(number).valueChanges();
  }
	addLocation(number : string,currentNumber : string){
		navigator.geolocation.getCurrentPosition((position) => {
			const loc = {
				latitude : position.coords.latitude,
				longitude : position.coords.longitude
			};
			this.d.doc(number).collection('ambulances').doc(currentNumber).update(loc,{ create : true });
		});
	}
	
	getLocations(number : string){
		return this.d.doc(number).collection('ambulances').valueChanges();
	} 
	notifyAmbulance(number : string, lat : Number, lon : Number){
		const victimLocation : Location = {
			latitude : lat,
			longitude : lon,
			victim : 'YES'
		}
		const docref = this.d.doc(number);
		docref.collection('ambulances').doc(number).set(victimLocation);
	}
	
	addMessage(docId : string, messenger : string , message : string,msgNo : Number){
		const data : Chat = {
			username : messenger,
			message : message
		}
		this.d.doc(docId).collection('ChatRoom').doc(String(msgNo)).set(data);
	}
	
	getChatRoomMessages(number : string){
		return this.d.doc(number).collection('ChatRoom').valueChanges();
	}
  
	createRoom(number : string){
		const firstMessage : Chat = {
			username : number,
			message : 'need help'
		}
		console.log(firstMessage);
		const docref = this.d.doc(number);
		docref.collection('ChatRoom').doc('0').set(firstMessage);
	}
	
	getItems(){
		return this.items;
	} 
	
	addItem(id:Number,username: string, message: string)
	{
		this.itemsCollection.doc(String(id)).set({
			username: username,
			message: message
		}).catch((err)=>{
			console.log('Error');
		});
	}
	
	
	getLocationByid(id : string){
	  return this.locationCollection.doc(id).valueChanges();
	  }
	
	insertAccept(number:string,currentUser : string){
		this.d.doc(number).collection('ambulances').doc(currentUser).update({accept : 'YES'});
	}
	insertReject(number:string,currentUser : string){
		this.d.doc(number).collection('ambulances').doc(currentUser).update({reject : 'YES'});
	}
	
	updateLocation(id:string,lat: number,lon : number)
	{
		this.database.doc<any>('ambulance-locations/'+id).update({
			latitude: lat + 0.000000010,
			longitude : lon
		}).catch((err)=>{
			console.log('Error');
		});
	}
	
	getPosition(): Observable<Object> {
		return Observable.create(observer => {
			navigator.geolocation.watchPosition((pos: Position) => {
				observer.next(pos);
			}),
			() => {
				console.log('Position is not available');
			},
			{
				enableHighAccuracy: true,
				distanceFilter: 0.000001
			};
		});
	}

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
  
  getPermission() : any{
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        localStorage.setItem('registerToken',token);
		if(localStorage.getItem('registerToken') != null){
					this.ds.getUser().subscribe(result => {
					var data = {
						userType : result.data.user[0].userType,
						registerToken : localStorage.getItem('registerToken')
					};
					this.ds.subscribeTopic(data).subscribe(res => {
						console.log(res);
					});
					});
				}	
			}
	   //this.updateToken(token)
      )
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
	  
    }
	
    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });
    }
}