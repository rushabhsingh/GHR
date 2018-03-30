import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
	base_url = "https://secure-sea-22568.herokuapp.com";
  constructor(private _http: Http) { }

  addUserEmail(user){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	return this._http.post(this.base_url + "/createUserEmail",user,{headers:headers}).map(res => res.json());
  }
  
  addUser(user){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	return this._http.post(this.base_url + "/createUser",user,{headers:headers}).map(res => res.json());
  }
  
  authenticateUser(user)
  {
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	return this._http.post(this.base_url + "/authenticateUser",user,{headers:headers}).map(res => res.json());
  }
  
  isLoggedIn(){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	  var token = localStorage.getItem('token');
	  var data = {
		  token : token
	  };
	  if(!token)
	  {
		 return false; 
	  }
	  else{
		return this._http.post(this.base_url + "/isLoggedIn",data,{headers:headers}).map(res => res.json().result);
	  }
	}
	
	isDoctor(){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	  var token = localStorage.getItem('token');
	  var data = {
		  token : token
	  };
	  if(!token)
	  {
		 return false; 
	  }
	  else{
		return this._http.post(this.base_url + "/isDoctor",data,{headers:headers}).map(res => res.json().doctor);
	  }
	}
	
	getSpecifiedUser(number : string){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	  var data = {
		  number : number
	  };
	  return this._http.post(this.base_url + "/getSpecifiedUser",data,{headers:headers}).map(res => res.json());
	}
	
	getSpecific(number : string){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	  var data = {
		  number : number
	  };
	  return this._http.post(this.base_url + "/getSpecific",data,{headers:headers}).map(res => res.json());
	}
	

	getUser(){
	  var headers = new Headers();
	  headers.append("content-type","application/json");
	  var token = localStorage.getItem('token');
	  var data = {
		  token : token
	  };
	  return this._http.post(this.base_url + "/isLoggedIn",data,{headers:headers}).map(res => res.json());
	  
	}
	

	sendSMS(email){
		console.log(email);
		var headers = new Headers();
	    headers.append("content-type","application/x-www-form-urlencoded");
		return this._http.post("http://localhost:80/SMS/sendSMS.php",email,{headers:headers}).map(res => res.json());
	}
	
	sendMail(email){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/sendMail",email,{headers:headers}).map(res => res.json());
	
	}
	
	verifyDoctor(user){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/verifyDoctor",user,{headers:headers}).map(res => res.json());
	
	}
	verifyAmbulance(user){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/verifyAmbulance",user,{headers:headers}).map(res => res.json());
	
	}
	verifyPolice(user){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/verifyPolice",user,{headers:headers}).map(res => res.json());
	
	}
	sendNotification(){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post("http://ghr1.epizy.com/SMS/send_message.php",{},{headers:headers}).map(res => res.json());
	}
	
	sendNoti(body){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/sendNoti",body,{headers:headers}).map(res => res.json());
	}
	
	subscribeTopic(body){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/subscribeToTopic",body,{headers:headers}).map(res => res.json());
	}
	
	setTimerChatRoom(body){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/setTimerChatRoom",body,{headers:headers}).map(res => res.json());
	}
	getCurrentTime(){
		var headers = new Headers();
	    headers.append("content-type","application/json");
		return this._http.post(this.base_url + "/getCurrentTime",{},{headers:headers}).map(res => res.json());
	
	}
}
