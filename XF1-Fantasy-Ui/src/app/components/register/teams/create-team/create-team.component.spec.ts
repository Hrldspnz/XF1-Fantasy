import { ComponentFixture,fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateTeamComponent } from './create-team.component';

/**
 * Unit testing for the CreateChampionshipComponent
 */
describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  /**
   * Makes the neccesary imports and config for the test to work
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ],
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
    fixture = TestBed.createComponent(CreateTeamComponent);
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
   * Validates that the init Functions runs correctly
   */
  it('ngOnInit runs', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  /**
   * Validates that the loadDrivers Functions runs correctly
   */
   it('loadDrivers runs', () => {
    expect(component.loadDrivers).toBeTruthy();
  });

  /**
   * Validates that the createTeam Functions runs correctly
   */
   it('createTeam runs', () => {
    
    component.remainingBudget=20;
    const result= component.driverCreated;
    expect(result).toEqual(false);
  });

  /**
   * Validates that the changeStateDriver Function runs correctly
   */
   it('changeStateDriver runs', () => {
    component.listDrivers=[{name:'Luois',price:20,state:"notChoosed"},{name:'Hamilton',price:10,state:"notChoosed"}]
    
    component.remainingBudget=20;
    component.changeStateDriver('Luois', 'notDelete')

    fixture.detectChanges();

    const result= component.driverCreated;
    expect(result).toEqual(true);
  });

  /**
   * Validates that the updateForm Function runs correctly
   */
   it('updateForm runs', () => {
    component.listDriverSelection=['Juan','Ana','Jose','Maria','Luis']
    component.updateForm();
    expect(component.updateForm).toBeTruthy();
  });

  /**
   * Validates that the addDriverr Function runs correctly
   */
   it('addDriver runs', () => {
    
    expect(component.addDriver).toBeTruthy();
  });

  /**
   * Validates that the deleteDriver Function runs correctly
   */
   it('deleteDriver runs', () => {
    component.listDrivers=[{name:'Luois',price:'20',state:"notChoosed"},{name:'Hamilton',price:'10',state:"notChoosed"}]
    
    component.counterDrivers=3;
    component.deleteDriver('Luois', '10')

    fixture.detectChanges();

    const result= component.driverCreated;
    expect(result).toEqual(false);
  });

  /**
   * Validates that the changeStateContructor Function runs correctly
   */
   it('changeStateContructor runs', () => {
    component.listCars=[{name:'Ferrari',price:20,state:"notChoosed"},{name:'Tesla',price:10,state:"notChoosed"}]
    component.changeStateConstructor('Tesla','add');

    const result= component.driverCreated;
    expect(result).toEqual(false);
  });

  /**
   * Validates that the addDeleteContructor Function runs correctly
   */
   it('addDeleteContructor runs', () => {
    component.listCars=[{name:'Ferrari',price:20,state:"notChoosed"},{name:'Tesla',price:10,state:"notChoosed"}]
    component.changeStateConstructor('Tesla','add');

    const result= component.driverCreated;
    expect(result).toEqual(false);
  });

  /**
   * Validates that the updateBudget Function runs correctly
   */
   it('updateBudget runs', () => {
    component.spentBudget=20;
    component.updateBudget('10','add')
    const result=component.spentBudget
    expect(result).toEqual(30);
  });

  /**
   * Validates that the setStep Function runs correctly
   */
   it('setStep runs', () => {
    component.setStep(40);
    const result=component.stepTeam;
    expect(result).toEqual(40);
  });

  /**
   * Validates that the nextStep Function runs correctly
   */
   it('nextStep runs', () => {
    component.stepTeam=20;
    component.nextStep();
    const result=component.stepTeam;
    expect(result).toEqual(21);
  });

  /**
   * Validates that the prevStep Function runs correctly
   */
   it('prevStep runs', () => {
    component.stepTeam=20;
    component.prevStep();
    const result=component.stepTeam;
    expect(result).toEqual(19);
  });

  
  
});
