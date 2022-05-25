import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {

  formDataUser: FormGroup;
  flagNext = false;

  constructor(private fb: FormBuilder) {
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
    }else
      alert("Se han guardado los datos correctamente")
      this.flagNext = true;
  }

}
