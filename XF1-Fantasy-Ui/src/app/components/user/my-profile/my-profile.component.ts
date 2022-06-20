import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  menu: Menu[] = [];

  /**
   *
   * @param _menuService
   */
  constructor(private _menuService: MenuService) { }

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
