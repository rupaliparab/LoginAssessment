import { Component, OnInit } from '@angular/core';
import { GeoService } from '../_services/geo.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  lat: number;
  lang: number;

  markers: any;

  constructor(private geo: GeoService) { }

  ngOnInit() {
    this.getUserLocation();
    this.geo.hits.subscribe(hits => this.markers = hits);

  }

  private getUserLocation(){
    // locate the user
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lang = position.coords.longitude;

        this.geo.geoLocations(500, [this.lat, this.lang])
      });
    }
  }

}
