import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { PlayersService } from 'src/app/services/players.service';
import { PrivateLeagueService } from 'src/app/services/private-league.service';


/**
 * Interface to declare the structure of data to save
 */
 interface User {
  nameUser: string;
  country: string;
  nameTeam1:string;
  nameTeam2:string;
  scuderia:string;
  leagueName:string;

}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  menu: Menu[] = [];
  userEmail:any= localStorage.getItem("email");
  userInfo:User={
    nameUser:'',
    country: '',
    nameTeam1:'',
    nameTeam2:'',
    scuderia:'',
    leagueName:'No estás en una liga privada'
  
  };

  constructor(private _menuService: MenuService,
              private _playerService: PlayersService,
              private _privateLeagueService:PrivateLeagueService) { }

  ngOnInit(): void {
    this.loadMenu();
    this.loadUserInfo();
    this.loadUserTeam();
    this.loadLeagueInfo();
  }

  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      this.menu = data;
      }
    )
  }

  /**
   * Loads the user info
   */
  loadUserInfo(){
    this._playerService.getUserInLeagueInfo(this.userEmail).subscribe(
      result=>{
        this.userInfo.nameUser=result.nameUser;
        this.userInfo.country=result.country;
        this.userInfo.scuderia=result.nameScuderia;
      }
    )
  }

  loadUserTeam(){
    this._playerService.getUserTeamInfo(this.userEmail).subscribe(
      result=>{
        try {
          this.userInfo.nameTeam1=result[0].nameTeam;
          this.userInfo.nameTeam2=result[1].nameTeam;
        } catch (error) {
          alert("Hubo un error cargando los equipos")
        }
        
      }
    )
  }

  loadLeagueInfo(){
    this._privateLeagueService.getUserLeagueInfo(this.userEmail).subscribe(
      result=>{
        this.userInfo.leagueName=result.nameLeague;
      }
    )
  }

}
