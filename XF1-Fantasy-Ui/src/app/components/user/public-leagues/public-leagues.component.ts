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
  pos:string;
  email:string;
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
  userDisplay= {
    nameUser:'',
    pos:'0',
    score:0
  }

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
        this.loadUserFirst();
      }
    )
  }

  loadUserFirst(){
    //for (var current in this.data) {
    //  if(current.email==)
    //}
    let counter=0;
    while(this.data[counter]!= undefined) {
      if(this.data[counter].email==this.user){
        this.userDisplay.nameUser= this.data[counter].nameUser;
        this.userDisplay.pos= this.data[counter].pos;
        this.userDisplay.score= this.data[counter].score;
        break;
      }
      counter++
    }

  }

  loadUserInfo(userEmail:string){
    localStorage.setItem('newUserEmail',userEmail)
    this.openDialog();
  }

  openDialog(){
    this._dialog.open(PopupComponent);
  }

}
