import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatSliderModule } from '@angular/material/slider';


import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ]
})
export class SharedModule { }
