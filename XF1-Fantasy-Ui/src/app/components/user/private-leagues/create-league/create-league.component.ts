import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {

  formPrivateLeague: FormGroup;
  menu: Menu[] = [];

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
