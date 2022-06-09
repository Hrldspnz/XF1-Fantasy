import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/interfaces/menu';
import { PrivateLeagueService } from 'src/app/services/private-league.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent} from '../popup/popup.component';


@Component({
  selector: 'app-private-leagues',
  templateUrl: './private-leagues.component.html',
  styleUrls: ['./private-leagues.component.css']
})

/**
 * Display the info for a private league of the user
 */
export class PrivateLeaguesComponent implements OnInit {

  menu: Menu[] = [];
  code:string="123"; /** Saves the code of the league of the user */
  leagueFlag=true; /** Indicates wether the user is in a private league or not */
  user=localStorage.getItem("email"); /** Saves the email of the current user that is logged */
  data = [];

  displayedColumns = ['pos','nameUser','select','nameTeam','country', 'score'];
  
  /**
   * Is the constructor of the class
   * @param _menuService saves the manu to display in the GUI
   * @param _privateLeagueService contains the methods to get info from the DB
   */
  constructor(private _menuService: MenuService,
    private _privateLeagueService:PrivateLeagueService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMenu();
    this.userInLeague();
    this.loadLeagues();
  }

  /**
   * Load the menu on gui
   */
  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      this.menu = data;
      }
    )
  }

  /**
   * Validates if the user is in a private league already and sets the leagueFlag
   */
  userInLeague(){
    //Have to pass user
    this._privateLeagueService.isInLeague("h.wolf@gmail.com").subscribe(
      result=>{
        if(result==0){
          this.leagueFlag=false;
        }else if(result==1){
          this.leagueFlag=true;
          this.loadLeagueId();
          this.loadLeagues();
        }
      }
    )
  }

  /**
   * If the user is in a private league it loads the league id on GUI
   */
  loadLeagueId(){
    this._privateLeagueService.getUserLeagueInfo("h.wolf@gmail.com").subscribe(
      result=>{
        this.code=result.id;
      }
    )
  }
  /**
   * It loads all teams of a private league in a table on GUI
   */
  loadLeagues(){
    this._privateLeagueService.getLeaguesOfUser("h.wolf@gmail.com").subscribe(
      result=> {
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
