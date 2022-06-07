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
import { UserComponent } from './components/user/user.component';
import { PrivateLeaguesComponent } from './components/user/private-leagues/private-leagues.component';
import { CreateLeagueComponent } from './components/user/private-leagues/create-league/create-league.component';
import { AddLeagueComponent } from './components/user/private-leagues/add-league/add-league.component';
import { PublicLeaguesComponent } from './components/user/public-leagues/public-leagues.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DataUserComponent,
    TeamsComponent,
    CreateTeamComponent,
    UserComponent,
    PrivateLeaguesComponent,
    CreateLeagueComponent,
    AddLeagueComponent,
    PublicLeaguesComponent,
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
