import { Component, OnInit } from '@angular/core';
declare var google: any;
import * as $ from 'jquery/dist/jquery.min.js';
declare var $:any;

@Component({
  selector: 'app-nclinics',
  templateUrl: './nclinics.component.html',
  styleUrls: ['./nclinics.component.css']
})
export class NclinicsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    var myLocation:any;
    var latlng:any;
    var geocoder:any;
    var map:any;
    var service:any;
    var my:any;
    var names:any[];
    var phone:any;
          if(navigator.geolocation)
          {        
             navigator.geolocation.getCurrentPosition(function(position)
             {
                  myLocation={
                  lat:position.coords.latitude,
                  long:position.coords.longitude}
                  
                 
        map = new google.maps.Map({
          center: myLocation,
          zoom: 10
        });
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
          radius: 4000,
          types: ['doctor']
        }, function(results,status,pagination)
      {
        if(status !=google.maps.places.PlacesServiceStatus.OK)
        {
          return;
        }
        else{
          
          createMarkers(results);
        }
      });

      

             },        
            function(error)
            {
              if(error.code==error.PERMISSION_DENIED)
              {
                 alert("Please Turn On Location");
              }
            }
           );
          }

          function createMarkers(places) {
            var bounds = new google.maps.LatLngBounds();
            var placesList = document.getElementById('places');
            for (var i = 1, place; place = places[i]; i++)
            {
              var id=place.place_id;
              bounds.extend(place.geometry.location);
              var name=place.name;
              number(id,name);
            }
            map.fitBounds(bounds);
          }
      
            function number(placeid,name)
            {
              var placename=name;
                var details=document.getElementById("details1");
                

            var request=
            {
              placeId:placeid
            };
           service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function(place,status)
            {
                     if (status == google.maps.places.PlacesServiceStatus.OK) {

                      if(place.formatted_phone_number)
                      {
                        phone=place.formatted_phone_number;
                      }  
                      else{
                        phone="<b>Not Available</b>";
                      }

                  
                      $('#details4').append("<div>","<b>Name:  </b>",placename,"<br>");
                     $('#details4').append("<b>Address:  </b>",place.formatted_address,"<br>");
                     $('#details4').append("<b>Phone Number:  </b>",phone,"</div>","<br>","<br>");
             }

            });


           }


  }

}
