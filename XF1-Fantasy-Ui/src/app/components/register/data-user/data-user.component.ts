import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {

  formDataUser: FormGroup;

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
    console.log(this.formDataUser)
  }
}
