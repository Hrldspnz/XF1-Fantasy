import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { PublicLeagueService } from 'src/app/services/public-league.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent} from '../popup/popup.component';
/**
 * Interface to declare the structure of data to save
 */
interface Positions {
  nameUser: string;
  country: string;
  score:number;
  pos:string;
  email:string;
  nameTeam:string;
}

/**
 * Component with the functionality of display the public league info
 */
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
    team1:'',
    pos1:'0',
    score1:0,
    team2:'',
    pos2:'0',
    score2:0
  }

  displayedColumns = ['pos','nameUser','select','nameTeam', 'country', 'score'];

  /**
   *
   * @param _menuService loads the menu bar in GUI
   * @param _publicLeagueService loads all necesarly requests from api
   * @param _dialog lets open popups
   */
  constructor(private _menuService: MenuService,
    private _publicLeagueService:PublicLeagueService,
    private _dialog: MatDialog) { }

  /**
   * Is initialize when the component start
   */
  ngOnInit() {
    this.loadMenu();
    this.getPositionsUsers();
  }

  /**
   * Loads the menu baar in interface
   */
  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      this.menu = data;
      }
    )
  }

  /**
   * Get the info of user in public league and loads it in a table in GUI
   */
  getPositionsUsers(){
    this._publicLeagueService.getParticipants().subscribe(
      result=>{
        this.data=result;
        this.loadUserFirst();
      }
    )
  }

  /**
   * Loads the info position of the current user loggued in public league
   */
  loadUserFirst(){
    let counter=0;
    let posUser=0;
    while(this.data[counter]!= undefined) {
      if(this.data[counter].email==this.user){
        
        console.log(this.data[counter])
        if(posUser==0){
          this.userDisplay.nameUser= this.data[counter].nameUser;
          this.userDisplay.pos1= this.data[counter].pos;
          this.userDisplay.score1= this.data[counter].score;
          this.userDisplay.team1= this.data[counter].nameTeam;
        }else {
          this.userDisplay.team2= this.data[counter].nameTeam;
          this.userDisplay.pos2= this.data[counter].pos;
          this.userDisplay.score2= this.data[counter].score;
        }
        posUser++;
      }
      counter++
    }

  }

  /**
   *
   * @param userEmail loads the user to see in local storage
   */
  loadUserInfo(userEmail:string){
    localStorage.setItem('newUserEmail',userEmail)
    this.openDialog();
  }

  /**
   * Open the popup to visualize the player info
   */
  openDialog(){
    this._dialog.open(PopupComponent);
  }

}
