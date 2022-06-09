import { ComponentFixture,fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { TeamsComponent } from './teams.component';

/**
 * Unit testing for the CreateChampionshipComponent
 */
describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  /**
   * Makes the neccesary imports and config for the test to work
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgSelectModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  /**
   * Is executed each time a test method is to be executed.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Validates that the component it's created
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
   * Validates that the method getNumTeams runs correctly
   */
  it('Get Num teams runs', () => {
    expect(component.getNumTeams).toBeTruthy();
  });

});
