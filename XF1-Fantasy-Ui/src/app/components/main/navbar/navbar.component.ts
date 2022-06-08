import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  constructor(private _menuService: MenuService,
    private router:Router) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu (){
    this._menuService.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

  logout(){
    localStorage.removeItem("email");
    this.router.navigate(['/login']);
  }

}
