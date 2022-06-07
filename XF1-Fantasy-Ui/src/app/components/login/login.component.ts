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
   * Validates the credentials for the login
   */
  login(){
    const user = this.formLogin.value.user;
    const password = this.formLogin.value.password;

    if ( user == "admin" && password == "admin"){
      this.fakeLoading();
    }else{
      this.wrongCredentialMsj();
      this.formLogin.reset();
    }
  }

  /**
   * It shows a message when the credentials are wrong
   */
  wrongCredentialMsj(){
    this._snackBar.open('Credenciales ingresadas son incorrectas', '',
    {duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'})
  }

  /**
   * Simulates a loading for 1.5 seconds
   */
  fakeLoading(){
    this.loading = true;
    setTimeout (() => {
      this.router.navigate(['main'])
    }, 1500)

  }
  /**
   * Saves the actual user in the service
   */
  save(){
    this._playerService.getUser(this.formLogin.value.user).subscribe(
      result=>{
        this._playerService.setCurrentlyUser(this.formLogin.value.user);
      },
      error=>{
        alert("Usuario incorecto");
      }
    )
  }

}
