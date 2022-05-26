import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';

interface DataCountry {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {

  formDataUser: FormGroup;
  flagNext = false;
  countries: DataCountry[] = [
    {value: 'Costa Rica', viewValue: 'Costa Rica'},
    {value: 'Panama', viewValue: 'Panama'},
    {value: 'Colombia', viewValue: 'Colombia'},
    {value: 'Argentina', viewValue: 'Argentina'},
    {value: 'Bolivia', viewValue: 'Bolivia'},
    {value: 'Peru', viewValue: 'Peru'}
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              private _userService: PlayersService)
  {
    this.formDataUser = this.fb.group ({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      country: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  addUser(){
    if (this.formDataUser.value.password != this.formDataUser.value.passwordConfirm){
      alert ("Las constraseñas no coinciden")
    }else {
      alert("Se han guardado los datos correctamente")
      const newUser: Object =
      {
        nameUser: this.formDataUser.value.name,
        email: this.formDataUser.value.email,
        country: this.formDataUser.value.country,
        pass: this.formDataUser.value.password,
        statePlayer: "inactivo"
      }
      console.log(newUser)
      /*this._userService.addNewUser(newUser).subscribe(data => {
        console.log(data);
      }, error => {
        alert("Error al crear Cuenta de Usuario, revise dirección de Correo Electrónico ingresada")
      }
      );*/
      this.router.navigate(['/register/create-team/' + this.formDataUser.value.email]);
    }
  }

}