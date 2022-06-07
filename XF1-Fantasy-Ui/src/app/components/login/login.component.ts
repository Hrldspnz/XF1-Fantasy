import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  pasword = "";

  /**
   * Constructor of the class
   * @param fb Form Builder instance
   * @param _snackBar Snack Bar instance
   * @param router Router Instance
   */
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router,
    private _playerService: PlayersService) {
    this.formLogin = this.fb.group({
      user : ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Validates the credential to determinate if is an user or admin
   */
  login(){
    const user = this.formLogin.value.user;
    const passwordInput = this.formLogin.value.password;
    console.log(this._playerService.getUserPassword(this.formLogin.value.user));
    if ( passwordInput == "admin"){
      this.fakeLoadingAdmin();
    }else{
      this.loginPlayers();
    }
  }


  /**
   * Simulates a loading for 1.5 seconds
   */
  fakeLoadingAdmin(){
    this.loading = true;
    setTimeout (() => {
      this.router.navigate(['main'])
    }, 1500)
  }



  /**
   * Simulates a loading for 1.5 seconds
   */
   fakeLoadingUser(){
    this.loading = true;
    setTimeout (() => {
      this.router.navigate(['user'])
    }, 1500)
  }

  /**
   * Saves the actual user in the service
   */
  loginPlayers(){
    this._playerService.getUser(this.formLogin.value.user).subscribe(
      result=>{
        console.log(result)
        if ( result.pass == this.formLogin.value.password ){
          this._playerService.setCurrentlyUser(this.formLogin.value.user, this.formLogin.value.password);
          this.fakeLoadingUser()
        } else {
          alert ( "Constraseña incorrecta" )
        }
      },
      error=>{
        alert("Usuario incorecto");
      }
    )
  }

}
