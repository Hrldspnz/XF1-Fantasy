import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Driver {
  name: string;
  price: number;
  state: string;
}

export interface Constructor {
  name: string;
  price: number;
  state: string;
}

const dataDrivers: Driver[] = [
  {name: 'Lewis Hamilton', price: 20, state: "notChoosed"},
  {name: 'Charles Leclerc', price: 14, state: "notChoosed"},
  {name: 'Valtteri Bottas', price: 6, state: "notChoosed"},
  {name: 'Sergio Perez', price: 9, state: "notChoosed"},
  {name: 'Fernando Alonso', price: 10, state: "notChoosed"},
  {name: 'Ferrari', price: 12, state: "notChoosed"}
];

const dataConstructors: Constructor[] = [
  {name: 'Mercedes', price: 30, state: "notChoosed"},
  {name: 'RedBull', price: 27, state: "notChoosed"},
  {name: 'Mclaren', price: 22, state: "notChoosed"},
  {name: 'Ferrari', price: 25, state: "notChoosed"},
  {name: 'Haas', price: 15, state: "notChoosed"},
  {name: 'Alfa Romeo', price: 12, state: "notChoosed"}
];

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  displayedColumnsDrivers: string[] = ['name', 'price', 'actions'];
  displayedColumnsConstructors: string[] = ['name', 'price', 'actions'];
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

  changeStateDriver(index: number) {
    console.log(index)
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

