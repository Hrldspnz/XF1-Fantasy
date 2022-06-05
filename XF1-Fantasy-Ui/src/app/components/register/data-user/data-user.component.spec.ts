import { ComponentFixture,fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { DataUserComponent } from './data-user.component';

describe('DataUserComponent', () => {
  let component: DataUserComponent;
  let fixture: ComponentFixture<DataUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUserComponent ],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valid user form', () =>{
    const name= component.formDataUser.controls['name']
    const email= component.formDataUser.controls['email']
    const password= component.formDataUser.controls['password']
    const passwordConfirm= component.formDataUser.controls['passwordConfirm']
    const country= component.formDataUser.controls['country']

    name.setValue('User001')
    email.setValue('user001@gmail.com')
    password.setValue('1234')
    passwordConfirm.setValue('1234')
    country.setValue('Venezuela')

    expect(component.formDataUser.invalid).toBeFalse();
  })

  it('Valid password entered', () =>{
    fixture = TestBed.createComponent(DataUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const password= component.formDataUser.controls['password']
    const passwordConfirm= component.formDataUser.controls['passwordConfirm']
    password.setValue('1234')
    passwordConfirm.setValue('1234')

    expect(password.value).toEqual(passwordConfirm.value);
  })

    /**
   * Validates that the method createScuderia runs correctly
   */
     it('Create scuderia runs', () => {
      component.createScuderia();

      expect(component.flagScuderia).toEqual(false);
    });

});
