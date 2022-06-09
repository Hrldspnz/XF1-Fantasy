import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  menu: Menu[] = [];

  /**
   *
   * @param _menuService
   */
  constructor(private _menuService: MenuService) { }

  /**
   *
   */
  ngOnInit(): void {
    this.loadMenu();
  }

  /**
   *
   */
  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

}
