import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRaceResultsComponent } from './upload-race-results.component';

describe('UploadRaceResultsComponent', () => {
  let component: UploadRaceResultsComponent;
  let fixture: ComponentFixture<UploadRaceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRaceResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRaceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
