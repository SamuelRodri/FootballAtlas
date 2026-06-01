import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeojsonService } from '../services/geojson.service';
import { Country } from '../../../core/models/country.model';
import { CountryMapper } from '../../../core/mappers/country.mapper';
import { NationalTeamRepository } from '../../national-teams/services/national-team.repository';
import { NationalTeam } from '../../national-teams/models/national-team.model';
import { NationalTeamDetailComponent } from '../../national-teams/components/national-team-detail/national-team-detail.component';

@Component({
  selector: 'app-world-map',
  imports: [
    NationalTeamDetailComponent
  ],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})

export class WorldMapComponent implements OnInit, AfterViewInit{

  private map!: L.Map;
  selectedCountry: Country | null = null;
  nationalTeams: NationalTeam[] = [];
  selectedTeam: NationalTeam | null = null;

  private geoJsonLayer!: L.GeoJSON;
  private selectedLayer?: L.Layer;

  constructor(
    private geoJsonService: GeojsonService,
    private nationalTeamRepository: NationalTeamRepository
  ) {}


  ngOnInit(): void {
    this.nationalTeamRepository.getAll().subscribe(teams => {
      this.nationalTeams = teams;
    });
  }

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

          const iso3 = feature.properties.iso_a3;

          this.selectedTeam =  this.nationalTeams.find(
            x => x.countryIso3 === iso3
          ) ?? null;

          this.selectCountry(feature, layer);
        });

      }
    }).addTo(this.map);
  });
}
}
