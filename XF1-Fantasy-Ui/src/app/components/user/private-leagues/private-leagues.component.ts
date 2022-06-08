import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/interfaces/menu';
import { PlayersService } from 'src/app/services/players.service';
import { PrivateLeagueService } from 'src/app/services/private-league.service';


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
  data = [

    {id: 1, name: 'Rajesh', email: 'rajesh@gmail.com'},
    {id:2, name: 'Paresh', email: 'paresh@gmail.com'},
    {id:3, name: 'Naresh', email: 'naresh@gmail.com'},
    {id:4, name: 'Suresh', email: 'suresh@gmail.com'},
    {id:5, name: 'Karan', email: 'karan@gmail.com'},
    {id:6, name: 'dummy', email: 'dummy@gmail.com'},
    {id:7, name: 'dummy1', email: 'dummy@gmail.com'},
    {id:8, name: 'dummy2', email: 'dummy@gmail.com'},
    {id:9, name: 'dummy3', email: 'dummy@gmail.com'},
    {id:10, name: 'dummy4', email: 'dummy@gmail.com'},
    {id:11, name: 'dummy5', email: 'dummy@gmail.com'},
    {id:12, name: 'dummy6', email: 'dummy@gmail.com'},
    {id:13, name: 'dummy7', email: 'dummy@gmail.com'},
    {id:14, name: 'dummy8', email: 'dummy@gmail.com'}
  ];

  displayedColumns = ['id', 'name', 'email'];
  
  /**
   * Is the constructor of the class
   * @param _menuService saves the manu to display in the GUI
   * @param _privateLeagueService contains the methods to get info from the DB
   */
  constructor(private _menuService: MenuService,
    private _privateLeagueService:PrivateLeagueService) { }

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
    
  }

}
