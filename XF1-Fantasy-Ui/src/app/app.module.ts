import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { DataUserComponent } from './components/register/data-user/data-user.component';
import { TeamsComponent } from './components/register/teams/teams.component';
import { CreateTeamComponent } from './components/register/teams/create-team/create-team.component';
import { CreateTeam2Component } from './components/register/teams/create-team2/create-team2.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DataUserComponent,
    TeamsComponent,
    CreateTeamComponent,
    CreateTeam2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
