import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataUserComponent } from './components/register/data-user/data-user.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateTeamComponent } from './components/register/teams/create-team/create-team.component';
import { TeamsComponent } from './components/register/teams/teams.component';
import { AddLeagueComponent } from './components/user/private-leagues/add-league/add-league.component';
import { CreateLeagueComponent } from './components/user/private-leagues/create-league/create-league.component';
import { PrivateLeaguesComponent } from './components/user/private-leagues/private-leagues.component';
import { PublicLeaguesComponent } from './components/user/public-leagues/public-leagues.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'register/data-user', component: DataUserComponent },
  { path: 'register/create-team/:email_user', component: TeamsComponent },
  { path: 'register/create-team/team1/:email_user', component: CreateTeamComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/private-leagues', component: PrivateLeaguesComponent },
  { path: 'user/private-leagues/join', component: AddLeagueComponent },
  { path: 'user/private-leagues/create', component: CreateLeagueComponent },
  { path: 'user/public-league', component: PublicLeaguesComponent },
  { path: 'main', loadChildren: () => import('./components/main/main.module').then(x => x.MainModule)},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
