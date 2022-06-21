import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StartComponent } from './start/start.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChampionshipComponent } from './championship/championship.component';
import { SharedModule } from '../shared/shared.module';
import { CreateChampionshipComponent } from './championship/create-championship/create-championship.component';
import { RacesComponent } from './races/races.component';
import { CreateRaceComponent } from './races/create-race/create-race.component';
import { UploadRaceResultsComponent } from './races/upload-race-results/upload-race-results.component';


@NgModule({
  declarations: [
    MainComponent,
    StartComponent,
    NavbarComponent,
    ChampionshipComponent,
    CreateChampionshipComponent,
    RacesComponent,
    CreateRaceComponent,
    UploadRaceResultsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
