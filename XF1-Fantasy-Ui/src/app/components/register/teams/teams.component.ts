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

  /**
   * Banderas para los pasos der crear una escuderia
   */
  flagTeam1 = false;
  flagTeam2 = false;
  flagFinished = false;
  emailUser: string | null;
  counterTeam = "";

  /**
   * Método constructor de la clase
   * @param router Instancia de Router
   * @param aRoute Instancia de ActivedRouter
   * @param fb Instancia FormBuilder
   * @param _teamService Servicio para los equipos
   * @param _userService Servicio para el usuario
   */
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _teamService: TeamsService,
    private _userService: PlayersService
  ) {
    this.emailUser = this.aRoute.snapshot.paramMap.get("email_user");
   }


   /**
    * Metodo que se ejecuta al iniciar el componente
    */
  ngOnInit(): void {
    this.getNumTeams();
  }

  /**
   * Método que obtiene el número de equipos de un usuario y activa las flags para los eventos según esto
   */
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
        if ( result.count == "0" ) {
        this.flagTeam1 = true;
        this.flagTeam2 = false;
        } if ( result.count == "1" ) {
        this.flagTeam1 = false;
        this.flagTeam2 = true;
        } if ( result.count == "2" ) {
        this.flagTeam1 = false;
        this.flagTeam2 = false;
        this.flagFinished = true;
        this.activeUser();
        }
    });
  }

  /**
   * Método que activa la cuenta de usuario una vez que se crearon los dos equipos
   */
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
