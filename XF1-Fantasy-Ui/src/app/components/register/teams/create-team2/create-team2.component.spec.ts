import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeam2Component } from './create-team2.component';

describe('CreateTeam2Component', () => {
  let component: CreateTeam2Component;
  let fixture: ComponentFixture<CreateTeam2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeam2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
