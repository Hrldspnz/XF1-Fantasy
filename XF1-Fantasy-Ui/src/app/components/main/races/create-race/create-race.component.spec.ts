import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { CreateRaceComponent } from './create-race.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RacesService} from 'src/app/services/races.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import * as Rx from 'rxjs';


/**
 * Unit testing for the CreateRaceComponent
 */
describe('CreateRaceComponent', () => {
  let component: CreateRaceComponent; /** Saves the component created */
  let fixture: ComponentFixture<CreateRaceComponent>; 

  /**
   * Makes the neccesary imports and config for the test to work
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRaceComponent ],
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
        RacesService
      ]
    })
    .compileComponents();
  });

  /** 
   * Is executed each time a test method is to be executed.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** 
   * It's a test to ensure that the component it's correctly created 
   */
  it('should create component CreateRace', () => {
    expect(component).toBeTruthy();
  }); 

  /** 
   * Validates that the function textValidation works correctly 
   */
  it('Text Validation is true', () => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const name= component.formRaces.controls['name']
    const track= component.formRaces.controls['track']
    const startDate= component.formRaces.controls['startDate']
    const endDate= component.formRaces.controls['endDate']
    const startTime= component.formRaces.controls['startTime']
    const endTime= component.formRaces.controls['endTime']
    const thiscountry= component.formRaces.controls['thiscountry']
    const champion= component.formRaces.controls['champion']

    name.setValue('My Champion')
    track.setValue('Algarve')
    startDate.setValue('02/04/2019')
    endDate.setValue('02/05/2019')
    startTime.setValue('04:00')
    endTime.setValue('08:00')
    thiscountry.setValue('Australia')
    champion.setValue('Silverstone')

    expect(component.textValidation()).toBeTruthy();
  }); 

  /**
   * Validates that the date function works
   */
  it('Date in the present Validation', () => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const startDate= component.formRaces.controls['startDate']
    startDate.setValue('2023-05-05')
  
    expect(component.dateValidation()).toBeTruthy();
  }); 
  
  /**
   * Validate that the overlap function is correct. 
   */
  it('Validation to avoid date overlap', fakeAsync(() => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(RacesService);
    let spy_getPosts = spyOn(service,"getRaces").and.callFake(() => {
      return Rx.of([]).pipe();
    });
    fixture.detectChanges();

    const startDate= component.formRaces.controls['startDate']
    const endDate= component.formRaces.controls['endDate']
  
    startDate.setValue('2022-05-25')
    endDate.setValue('2022-05-26')
    
    const result=component.racesDates();
    console.log("resultado es: ", result)
    expect(result).toEqual(true);
    

  })); 

  /**
   * Validates the function that changes the date format.
   */
  it('Date split validation', () => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const finalDate= '2022-05-16'
    const result= component.DateSplit('5/16/2022')
    expect(result).toEqual(finalDate);
  }); 

  /**
   * Validates the correct generation of an id
   */
  it('generate ids succesfully with six characters', async() => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const actualLen=6;
    let result= component.generateId();
    expect(result.length).toEqual(actualLen);
  });

});
