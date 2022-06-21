import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  public url: string;

  /**
   * Constructor of the class
   * @param _http Http Client instance
   */
  constructor(
    public _http: HttpClient
  ) {
      this.url =  "https://apixfia.azurewebsites.net/";
    }

  /**
  * Get the all the championships from the data base
  * @returns JSON with all championships
  */
  public getChampions(): Observable<any>{
    return this._http.get(this.url + 'api/tournament');
  }

  /**
   * Add a new race into a championship in the data base
   * @param raceData
   */
  public createRace(raceData:Object) {
    console.log(this.url+'api/race/newrace');
    console.log(raceData)
      this._http.post(this.url+'api/race/newrace', raceData).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Get the all the championships from the data base
   * @returns JSON with all races
   */
  public getRaces(): Observable<any>{
    return this._http.get(this.url + 'api/race');
  }

  public sendResults(body:Object): Observable<any>{
    return this._http.post(this.url+'api/race/results',body);
  }
}
