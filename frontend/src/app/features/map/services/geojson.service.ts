import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor(private http: HttpClient) { }

  loadWorldGeoJson(): Observable<any> {
    return this.http.get('/geojson/world.geojson');
  }
}
