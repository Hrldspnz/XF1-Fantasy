import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { PublicLeagueService } from 'src/app/services/public-league.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent} from '../popup/popup.component';

interface Positions {
  nameUser: string;
  country: string;
  score:number;
  position:number;
}

@Component({
  selector: 'app-public-leagues',
  templateUrl: './public-leagues.component.html',
  styleUrls: ['./public-leagues.component.css']
})
export class PublicLeaguesComponent implements OnInit {
  menu: Menu[] = [];
  user=localStorage.getItem("email"); /** Saves the email of the current user that is logged */
  data: Positions[] = [];
  flag=false;

  displayedColumns = ['pos','nameUser','select','nameTeam', 'country', 'score'];

  constructor(private _menuService: MenuService,
    private _publicLeagueService:PublicLeagueService,
    private _dialog: MatDialog) { }

  ngOnInit() { 
    this.loadMenu();
    this.getPositionsUsers();
  }

  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      this.menu = data;
      }
    )
  }

  getPositionsUsers(){
    this._publicLeagueService.getParticipants().subscribe(
      result=>{
        this.data=result;
      }
    )
  }

  loadUserInfo(userEmail:string){
    localStorage.setItem('newUserEmail',userEmail)
    this.openDialog();
  }

  openDialog(){
    this._dialog.open(PopupComponent);
  }

}
