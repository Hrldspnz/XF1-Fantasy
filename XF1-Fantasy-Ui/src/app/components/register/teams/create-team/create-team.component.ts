import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Driver {
  name: string;
  price: number;
}

export interface Constructor {
  name: string;
  price: number;
}

const dataDrivers: Driver[] = [
  {name: 'Lewis Hamilton', price: 20},
  {name: 'Charles Leclerc', price: 14},
  {name: 'Valtteri Bottas', price: 6},
  {name: 'Sergio Perez', price: 9},
  { name: 'Fernando Alonso', price: 10},
  {name: 'Ferrari', price: 12},
];

const dataConstructors: Constructor[] = [
  {name: 'Mercedes', price: 30},
  {name: 'RedBull', price: 27},
  {name: 'Mclaren', price: 22},
  {name: 'Ferrari', price: 25},
  {name: 'Haas', price: 15},
  {name: 'Alfa Romeo', price: 12},
];

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  displayedColumnsDrivers: string[] = ['name', 'price'];
  displayedColumnsConstructors: string[] = ['name', 'price'];
  dataSourceDrivers= dataDrivers;
  dataSourceConstructors = dataConstructors;
  stepTeam = 0;

  formTeam1: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formTeam1 = this.fb.group ({
      driver1: ['', Validators.required],
      driver2: ['', Validators.required],
      driver3: ['', Validators.required],
      driver4: ['', Validators.required],
      driver5: ['', Validators.required],
      constructor: ['', Validators.required]
      })
  }

  ngOnInit(): void {
  }

  createTeam(){
    console.log("CREANDO EQUIPO")
  }

  setStep(index: number) {
    this.stepTeam = index;
  }

  nextStep() {
    this.stepTeam++;
  }

  prevStep() {
    this.stepTeam--;
  }

}

