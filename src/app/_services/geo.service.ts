import { Injectable } from "@angular/core";
import { AngularFireDatabase } from  'angularfire2/database';
import * as geofire from "geofire";
import  { BehaviorSubject } from 'rxjs';

@Injectable()
export class GeoService {
  dbRef: any;
  geoFire: any;

  hits = new  BehaviorSubject([]);

  constructor(private db: AngularFireDatabase){
    /// Reference  database location for GeoFire
    this.dbRef =  this.db.list('/location');
    this.geoFire = geofire;
  }

  /// Add Geofire data to database
  setLocation(key: string, coords: Array<number>) {
    this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(error => console.log(error))
  }

  /// Queries database for nearby location, then map  to BehaviorSubject
  geoLocations(radius: number, coords: Array<number>){
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) =>{
      let hit = {
        location: location,
        distance: distance
      }
      let currentHits = this.hits.value;
      currentHits.push(hit);
      this.hits.next(currentHits);
    })
  }
}
