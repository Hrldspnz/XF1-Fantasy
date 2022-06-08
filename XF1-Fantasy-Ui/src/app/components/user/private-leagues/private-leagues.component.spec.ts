import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLeaguesComponent } from './private-leagues.component';

describe('PrivateLeaguesComponent', () => {
  let component: PrivateLeaguesComponent;
  let fixture: ComponentFixture<PrivateLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLeaguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
