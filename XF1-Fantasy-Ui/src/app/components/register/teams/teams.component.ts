import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {


  flagTeam1 = false;
  flagTeam2 = false;
  flagFinished = false;
  emailUser: string | null;
  counterTeam = "";

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _teamService: TeamsService,
    private _userService: PlayersService
  ) {
    this.emailUser = this.aRoute.snapshot.paramMap.get("email_user");
   }

  ngOnInit(): void {
    this.getNumTeams();
  }

  getNumTeams(){
    const user: Object =
    {
        nameUser:"",
        email: this.emailUser,
        country:"",
        pass:"",
        statePlayer:""
    }
    console.log(this.emailUser)
    this._teamService.getNumTeamsByUser(user).subscribe (
      result => {
        this.counterTeam = result.count;
        console.log(result.count);
        this.updateFlags();
    });
  }

  updateFlags(){
    if ( this.counterTeam == "0" ) {
      this.flagTeam1 = true;
      this.flagTeam2 = false;
      console.log("CONTADOR DE 0")
      } if ( this.counterTeam == "1" ) {
      this.flagTeam1 = false;
      this.flagTeam2 = true;
      console.log("CONTADOR DE 1")
      } if ( this.counterTeam == "2" ) {
      this.flagTeam1 = false;
      this.flagTeam2 = false;
      this.flagFinished = true;
      console.log("CONTADOR DE 2")
      this.activeUser();
      }
  }

  activeUser(){
    const user: Object =
    {
        userName:this.emailUser,
        statePlayer: "activo"
    }
    this._userService.activeUserAcc(user).subscribe(data => {
      console.log(user);
    }, error => {
      alert("Error al finalizar sesión")
    });
  }

}
