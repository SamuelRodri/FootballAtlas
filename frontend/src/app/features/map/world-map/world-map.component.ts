import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { GeojsonService } from '../services/geojson.service';
import { Country } from '../../../core/models/country.model';
import { CountryMapper } from '../../../core/mappers/country.mapper';

@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})

export class WorldMapComponent implements AfterViewInit{

  private map!: L.Map;
  selectedCountry: Country | null = null;

  private geoJsonLayer!: L.GeoJSON;
  private selectedLayer?: L.Layer;

  constructor(
    private geoJsonService: GeojsonService
  ) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }


  private getDefaultStyle(): L.PathOptions {
    return {
      color: '#666',
      weight: 1,
      fillOpacity: 0
    };
  }

  private getHoverStyle(): L.PathOptions {
    return {
      color: '#3388ff',
      weight: 3,
      fillOpacity: 0.2
    };
  }

  private getSelectedStyle(): L.PathOptions {
    return {
      color: '#ff6600',
      weight: 3,
      fillOpacity: 0.3
    };
  }

  private selectCountry(
    feature: any,
    layer: L.Layer
  ): void {

    if (this.selectedLayer) {
      this.geoJsonLayer.resetStyle(
        this.selectedLayer as L.Path
      );
    }

    this.selectedLayer = layer;

    (layer as L.Path).setStyle(
      this.getSelectedStyle()
    );

    this.selectedCountry = CountryMapper.fromGeoJson(feature.properties);

    this.map.fitBounds(
      (layer as L.Polygon).getBounds()
    );
  }




  private initializeMap(): void {

  this.map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  this.geoJsonService.loadWorldGeoJson().subscribe(data => {

    this.geoJsonLayer = L.geoJSON(data, {
      style: () => this.getDefaultStyle(),

      onEachFeature: (feature, layer) => {

        layer.on('mouseover', (e) => {

          if (layer !== this.selectedLayer) {
            (e.target as L.Path).setStyle(
              this.getHoverStyle()
            );
          }
        });

        layer.on('mouseout', (e) => {

          if (layer !== this.selectedLayer) {
            this.geoJsonLayer.resetStyle(
              e.target as L.Path
            );
          }
        });

        layer.on('click', () => {

          this.selectCountry(feature, layer);
        });

      }
    }).addTo(this.map);
  });
}
}
