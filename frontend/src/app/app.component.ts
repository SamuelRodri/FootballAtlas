import { Component } from '@angular/core';
import { WorldMapComponent } from './features/map/world-map/world-map.component';

@Component({
  selector: 'app-root',
  imports: [WorldMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
