import { Component, OnInit } from '@angular/core';
import {RemediesService} from '../remedies.service';
import {FormGroup,FormControl} from '@angular/forms';
import * as $ from 'jquery/dist/jquery.min.js';
declare var $:any;

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
  providers:[RemediesService]
})
export class DocsComponent implements OnInit {

    remedies:any;
    remedyname:string;
    remedyshow:boolean=false;
    name:string;
    remedy:any;
    searching:string;
    form;
   
    constructor(private Remedies:RemediesService) { }

  ngOnInit() {


    this.form=new FormGroup(
      {
        search: new FormControl()
      });
  }
  
  getRemedies(value)
  {
        this.searching=value.search;
        if(this.searching==null)
        {
          alert("please search  for something");
        }
        else{
         console.log(this.searching);
          this.Remedies.getRemedy(this.searching).subscribe(response=>{  
            if(response.result == 'failure'){
				alert("Not found");
			}
			else{
				this.remedyname = response.data[0].name;
				this.remedies = response.data[0].remedy;
				this.remedyshow = true;
			}
            
    }); 
          
        }
         
  }

}
