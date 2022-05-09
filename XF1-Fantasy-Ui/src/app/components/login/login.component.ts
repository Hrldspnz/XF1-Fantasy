import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.formLogin = this.fb.group({
      user : ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


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

  wrongCredentialMsj(){
    this._snackBar.open('Credenciales ingresadas son incorrectas', '',
    {duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'})
  }

  fakeLoading(){
    this.loading = true;
    setTimeout (() => {
      this.router.navigate(['main'])
    }, 1500)

  }

}
