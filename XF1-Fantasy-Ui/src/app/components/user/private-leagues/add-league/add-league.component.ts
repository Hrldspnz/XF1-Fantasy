import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.css']
})
export class AddLeagueComponent implements OnInit {

  menu: Menu[] = [];
  formJoinLeague: FormGroup;

  constructor(private fb: FormBuilder, private _menuService: MenuService) {
    this.formJoinLeague = this.fb.group ({
      code: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

  JoinLeague(){
    console.log("Join League")
  }

}
