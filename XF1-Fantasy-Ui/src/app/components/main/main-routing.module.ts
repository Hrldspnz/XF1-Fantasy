import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './championship/championship.component';
import { MainComponent } from './main.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component: StartComponent },
    { path: 'championship', component: ChampionshipComponent },
    { path: 'start', component: StartComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
