import { ComponentFixture,fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Unit testing for the CreateChampionshipComponent
 */
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  /**
   * Makes the neccesary imports and config for the test to work
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** 
   * Validates that the component it's created correctly
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** 
   * Validates that isAllSelected works correctly
   */
   it('allSelected runs', () => {
    expect(component.isAllSelected()).toBeFalsy();
  });

  /**
   * Validates masterToggle works correctly
   */
  it('master Toggle', () => {
    expect(component.masterToggle).toBeTruthy();
  });
});
