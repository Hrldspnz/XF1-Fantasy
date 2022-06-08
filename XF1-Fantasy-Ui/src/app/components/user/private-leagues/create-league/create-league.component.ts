import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

interface Datos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {

  formPrivateLeague: FormGroup;
  menu: Menu[] = [];

  countries: Datos[] = [
    {value: '5-0', viewValue: '5'},
    {value: '6-1', viewValue: '6'},
    {value: '7-2', viewValue: '7'},
    {value: '8-3', viewValue: '8'},
    {value: '9-4', viewValue: '9'},
    {value: '10-5', viewValue: '10'},
    {value: '11-6', viewValue: '11'},
    {value: '12-7', viewValue: '12'},
    {value: '13-8', viewValue: '13'},
    {value: '14-9', viewValue: '14'},
    {value: '15-10', viewValue: '15'},
    {value: '16-11', viewValue: '16'},
    {value: '17-12', viewValue: '17'},
    {value: '18-13', viewValue: '18'},
    {value: '19-14', viewValue: '19'},
    {value: '20-15', viewValue: '20'}
  ];

  constructor(private fb: FormBuilder, private _menuService: MenuService) {
    this.formPrivateLeague = this.fb.group ({
      name: ['', Validators.required],
      members: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.loadMenu();
  }

  addLeague(){
    console.log("Se creo liga privada")
  }


  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }


}