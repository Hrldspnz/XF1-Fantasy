import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './championship/championship.component';
import { CreateChampionshipComponent } from './championship/create-championship/create-championship.component';
import { MainComponent } from './main.component';
import { StartComponent } from './start/start.component';
import { RacesComponent } from './races/races.component';
import { CreateRaceComponent } from './races/create-race/create-race.component';
import { UploadRaceResultsComponent } from './races/upload-race-results/upload-race-results.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component: StartComponent },
    { path: 'championship', component: ChampionshipComponent },
    { path: 'start', component: StartComponent },
    { path: 'create-championship', component: CreateChampionshipComponent },
    { path: 'races', component: RacesComponent},
    { path: 'create-races', component: CreateRaceComponent},
    { path: 'upload-result', component: UploadRaceResultsComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
