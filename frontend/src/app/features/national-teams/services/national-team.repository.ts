import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NationalTeam } from '../models/national-team.model';

@Injectable({
  providedIn: 'root'
})
export class NationalTeamRepository {

  getAll(): Observable<NationalTeam[]> {
    return of([
      {
        id: 'ESP',
        name: 'Spain',
        countryIso3: 'ESP'
      },
      {
        id: 'ARG',
        name: 'Argentina',
        countryIso3: 'ARG'
      },
      {
        id: 'BRA',
        name: 'Brazil',
        countryIso3: 'BRA'
      }
    ]);
  }
}
