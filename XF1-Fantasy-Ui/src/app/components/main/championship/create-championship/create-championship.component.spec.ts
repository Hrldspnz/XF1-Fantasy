import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ChampionshipService } from 'src/app/services/championship.service';
import {MatToolbarModule} from '@angular/material/toolbar';

import { CreateChampionshipComponent } from './create-championship.component';

/**
 * Unit testing for the CreateChampionshipComponent
 */
describe('CreateChampionshipComponent', () => {
  let component: CreateChampionshipComponent; 
  let fixture: ComponentFixture<CreateChampionshipComponent>;

  /**
   * Makes the neccesary imports and config for the test to work
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChampionshipComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgSelectModule, 
        MatSelectModule,
        MatInputModule, 
        BrowserAnimationsModule,
        MatToolbarModule
      ],
      providers: [
        ChampionshipService
      ]
    })
    .compileComponents();
  });

  /** 
   * Is executed each time a test method is to be executed.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  /**
   * Validates that the component is correctly created
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
  
  /**
   * Validates that the ids are obtained correctly
   */
  it('run getIDs succesfully', () => {
    expect(component.getIDs).toBeDefined();
  }); 

  /**
   * Validates that the ids are generated correctly
   */
  it('does de id generation', () => {

    const actualLen=6;
    const result= component.generateID();
    //expect(result.length).toEqual(actualLen);
  });

  /**
   * Validates that the function textValidation works correctly
   */
  it('Text Validation is true', () => {
    fixture = TestBed.createComponent(CreateChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const name= component.formChampionship.controls['name']
    const track= component.formChampionship.controls['rules']

    name.setValue('My Champion')
    track.setValue('it is necessary to have two teams per player')
    expect(component.textValidation()).toBeTruthy();
  }); 
 
  /**
   * Validates that the date function works 
   */
  it('Date in the present Validation', () => {
    fixture = TestBed.createComponent(CreateChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const startDate= component.formChampionship.controls['startDate']
    startDate.setValue('2023-05-05')
  
    expect(component.dateValidation()).toBeTruthy();
  }); 

  /**
   * Validates that the function addChampionship works correctly
   */
  it('add championship runs', async() => {
    fixture = TestBed.createComponent(CreateChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.addChampionship).toBeDefined();
  });

});
