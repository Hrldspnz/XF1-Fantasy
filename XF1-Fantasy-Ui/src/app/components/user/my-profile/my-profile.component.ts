import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  menu: Menu[] = [];
  user:any = localStorage.getItem("email");
  public team: any = [
    {
        "nameTeam": "Equipo 1",
        "email": null,
        "budget": 77,
        "nameDriver1": "Alexander Albon",
        "nameDriver2": "Carlos Sainz",
        "nameDriver3": "Charles Leclerc",
        "nameDriver4": "Daniel Ricciardo",
        "nameDriver5": "Esteban Ocon",
        "car": "Haas"
    }];
  displayedColumns = ['nameTeam','nameDriver1','nameDriver2','nameDriver3', 'nameDriver4', 'nameDriver5','car','budget', 'actions'];

  /**
   * Constructor of the class
   * @param _menuService
   */
  constructor(private _menuService: MenuService,  private _playerService:PlayersService, private router: Router) { }

  ngOnInit(): void {
    this.loadMenu();
    console.log(this.user)
    this.loadUserInfo();
  }

  loadUserInfo(){
    this._playerService.getUserTeamInfo(this.user).subscribe(
      result=>{
        this.team=result;
        console.log(result)
      }
    )
  }

  /**
   * Loads the menu from the data base
   */
  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

  editTeam(index: number){
    console.log(this.team[index])
    this.router.navigate(['user/edit-team']);
  }
}
