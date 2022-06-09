import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  public userEmail:any;
  public team:any= [
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
  displayedColumns = ['nameTeam','nameDriver1','nameDriver2','nameDriver3', 'nameDriver4', 'nameDriver5','car','budget'];

  public userInfo={
    name:'',
    country:'',
    year:'Este usuario no ha ganado campeonatos aún'
  }

  constructor(
    private _playerService:PlayersService
  ) { }

  ngOnInit(): void {
    this.userEmail= localStorage.getItem('newUserEmail')
    this.loadUserInfo();
    this.loadUserData();
  }

  loadUserInfo(){
    this._playerService.getUserTeamInfo(this.userEmail).subscribe(
      result=>{
        this.team=result;
      }
    )
  }

  loadUserData() {
    this._playerService.getUserInLeagueInfo(this.userEmail).subscribe(
      result=> {
        this.userInfo.name=result.nameUser;
        this.userInfo.country=result.country;
        if(result.year_T!=""){
          this.userInfo.year=result.year_T;
        }
      }
    )
  }

  closeWithoutSave(){
    localStorage.removeItem('newUserEmail');
  }

}
