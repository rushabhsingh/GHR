import { Injectable } from '@angular/core';
import {Http,Response,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemediesService {

 private geturl;
 private url;
  
  constructor(private http:Http) { }

  getRemedy(value:String)
  {
	  
		this.geturl='https://secure-sea-22568.herokuapp.com/remedies';
		var headers = new Headers();
	    headers.append("content-type","application/json");
		var data = {
			value : value
		};
		return this.http.post(this.geturl,data,{headers:headers}).map(res => res.json());
	 
  }

}
