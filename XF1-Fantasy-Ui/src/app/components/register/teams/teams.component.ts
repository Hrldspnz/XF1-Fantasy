import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {


  flagTeam1 = false;
  flagTeam2 = false;
  flagScuderia = true;
  flagFinished = false;
  emailUser: string | null;
  formScuderia: FormGroup;
  //counterTeam: string | null;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _teamService: TeamsService
  ) {
    this.emailUser = this.aRoute.snapshot.paramMap.get("email_user");
    this.formScuderia = this.fb.group({
      nameScuderia: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  stateProcess () {

  }


  createScuderia(){
    const scuderia: Object =
    {
      nameScuderia: this.formScuderia.value.nameScuderia,
      email: this.emailUser,
    }
    console.log(scuderia)
    /*this._teamService.addNewScuderia(scuderia).subscribe(data => {
      console.log(data);
    }, error => {
      alert("Error al crear Cuenta de Usuario, revise dirección de Correo Electrónico ingresada")
    }
    );*/
    this.flagScuderia = false;
    this.flagTeam1 = true;
  }


}
