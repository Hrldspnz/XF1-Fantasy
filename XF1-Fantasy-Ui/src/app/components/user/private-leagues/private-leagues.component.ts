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
  user:any=localStorage.getItem("email"); /** Saves the email of the current user that is logged */
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

  /**
   * It runs when the component initialize
   * Load all the information in the GUI
   */
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
    this._privateLeagueService.isInLeague(this.user).subscribe(
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
    this._privateLeagueService.getUserLeagueInfo(this.user).subscribe(
      result=>{
        this.code=result.id;
      }
    )
  }
  /**
   * It loads all teams of a private league in a table on GUI
   */
  loadLeagues(){
    this._privateLeagueService.getLeaguesOfUser(this.user).subscribe(
      result=> {
        this.data=result;
      }
    )
  }

  /**
   * Calls the function that open popup with an user information and saves the email
   * @param userEmail is the email of the user to show the info 
   */
  loadUserInfo(userEmail:string){
    localStorage.setItem('newUserEmail',userEmail)
    this.openDialog();
  }

  /**
   * Opens the popup
   */
  openDialog(){
    this._dialog.open(PopupComponent);
  }

}
