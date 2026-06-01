import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { GeojsonService } from '../services/geojson.service';

@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})

export class WorldMapComponent implements AfterViewInit{

  private map!: L.Map;
  selectedCountry: any = null;

  constructor(
    private geoJsonService: GeojsonService
  ) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {

  this.map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  this.geoJsonService.loadWorldGeoJson().subscribe(data => {

    console.log('GeoJSON data loaded:', data);

    L.geoJSON(data, {
      style: {
        color: 'red',
        weight: 2,
        fillOpacity: 0
      },
      onEachFeature: (feature, layer) => {

        layer.on('click', () => {

          this.selectedCountry = {
            name: feature.properties.name,
            nameEs: feature.properties.name_es,
            iso2: feature.properties.iso_a2,
            iso3: feature.properties.iso_a3,
            continent: feature.properties.continent
          }

          console.log(this.selectedCountry);
        });

      }
    }).addTo(this.map);

  });
}
}
