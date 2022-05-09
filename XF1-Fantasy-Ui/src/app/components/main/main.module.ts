import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StartComponent } from './start/start.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChampionshipComponent } from './championship/championship.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    StartComponent,
    NavbarComponent,
    ChampionshipComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
