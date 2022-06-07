import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/interfaces/menu';
import { PlayersService } from 'src/app/services/players.service';


@Component({
  selector: 'app-private-leagues',
  templateUrl: './private-leagues.component.html',
  styleUrls: ['./private-leagues.component.css']
})
export class PrivateLeaguesComponent implements OnInit {

  menu: Menu[] = [];
  constructor(private _menuService: MenuService, private _playerService:PlayersService) { }

  ngOnInit(): void {
    this.loadMenu();
    this.loadsPlayer();
  }

  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

  loadsPlayer(){
    var usuario= this._playerService.user.email;
    console.log("El usuario es: ", usuario);
    
  }

}
