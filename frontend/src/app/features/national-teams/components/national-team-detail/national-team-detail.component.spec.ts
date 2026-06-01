import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalTeamDetailComponent } from './national-team-detail.component';

describe('NationalTeamDetailComponent', () => {
  let component: NationalTeamDetailComponent;
  let fixture: ComponentFixture<NationalTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalTeamDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
