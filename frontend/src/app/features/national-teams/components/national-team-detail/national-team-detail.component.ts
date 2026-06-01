import { Component, Input } from '@angular/core';
import { NationalTeam } from '../../models/national-team.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-national-team-detail',
  standalone: true,
  templateUrl: './national-team-detail.component.html',
  styleUrl: './national-team-detail.component.css',
  imports: [NgIf]
})
export class NationalTeamDetailComponent {

  @Input()
  team: NationalTeam | null = null;

}
