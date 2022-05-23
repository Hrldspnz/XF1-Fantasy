import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  rol: string;
  price: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {rol: 'Piloto', name: 'Lewis Hamilton', price: 1.0079},
  {rol: 'Piloto', name: 'Charles Leclerc', price: 4.0026},
  {rol: 'Piloto', name: 'Valtteri Bottas', price: 6.941},
  {rol: 'Piloto', name: 'Sergio Perez', price: 9.0122},
  {rol: 'Piloto', name: 'Fernando Alonso', price: 10.811},
  {rol: 'Constructor', name: 'Ferrari', price: 12.0107},
];

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['rol', 'name', 'price'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
