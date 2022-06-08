import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  public url: string;

  /**
   * Metodo constructor de la clase
   * @param _http
   */
  constructor(
    public _http: HttpClient
  ) {
      this.url =  "https://apixfia.azurewebsites.net/";
    }

  /**
  *
  * @returns
  */
  public getChampions(): Observable<any>{
    return this._http.get(this.url + 'api/tournament');
  }

  /**
   *
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
   *
   * @returns
   */
  public getRaces(): Observable<any>{
    return this._http.get(this.url + 'api/race');
  }
}
