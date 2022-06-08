import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/interfaces/menu';
@Component({
  selector: 'app-private-leagues',
  templateUrl: './private-leagues.component.html',
  styleUrls: ['./private-leagues.component.css']
})
export class PrivateLeaguesComponent implements OnInit {

  menu: Menu[] = [];
  constructor(private _menuService: MenuService) { }

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

}
