import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLeaguesComponent } from './public-leagues.component';

describe('PublicLeaguesComponent', () => {
  let component: PublicLeaguesComponent;
  let fixture: ComponentFixture<PublicLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLeaguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
