import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {

  formPrivateLeague: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formPrivateLeague = this.fb.group ({
      name: ['', Validators.required],
      members: ['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

  addLeague(){
    console.log("Se creo liga privada")
  }



}
