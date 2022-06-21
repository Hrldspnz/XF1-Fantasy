import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public url: string;


  /**
   * Constructor of the class
   * @param _http HttpClient instance
   */
  constructor( public _http: HttpClient ) {

    this.url = "https://apixfia.azurewebsites.net/"
  }

  /**
   * Get the drivers from the data base
   * @returns Observable with the result
   */
  getDrivers(): Observable<any> {
    return this._http.get(this.url + 'api/team/drivers');
  }

  /**
   * Get the cars from the data base
   * @returns Observable with the result
   */
  getCars(): Observable<any> {
    return this._http.get(this.url + 'api/team/cars');
  }

  /**
   * Add a new team into the data base
   * @param dataTeam JSON with data of the team
   * @returns Observable with the result
   */
  addNewTeam(dataTeam: Object): Observable<any>{
    return this._http.post(this.url+'api/team/newteam', dataTeam);
  }

  /**
   * Add a new scuderia into the data base
   * @param dataScuderia JSON with data of the team
   * @returns Observable with the result
   */
  addNewScuderia(dataScuderia: Object): Observable<any>{
    return this._http.post(this.url+'api/team/newscuderia', dataScuderia);
  }

  /**
   * Get the number of teams for player of the data base
   * @param user JSON with data of the user
   * @returns Observable with the result
   */
  getNumTeamsByUser(user: Object): Observable<any>{
    return this._http.post(this.url+'api/player/teamsxplayer', user);
  }


  /**
   * Add a new team into the data base
   * @param dataTeam JSON with data of the team
   * @returns Observable with the result
   */
   updateTeam(dataTeam: Object): Observable<any>{
    return this._http.put(this.url+'api/team/teamupdate', dataTeam);
  }

}
