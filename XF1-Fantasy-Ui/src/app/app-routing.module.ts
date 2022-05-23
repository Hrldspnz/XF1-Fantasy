import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataUserComponent } from './components/register/data-user/data-user.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsComponent } from './components/register/teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'register/data-user', component: DataUserComponent },
  { path: 'register/teams', component: TeamsComponent },
  { path: 'main', loadChildren: () => import('./components/main/main.module').then(x => x.MainModule)},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
