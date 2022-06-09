import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

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
 * Add a new championship into the data base
 * @param championship Data of the new championship
 */
addChampionship(championship: Object){
  console.log(this.url+'api/tournament/newtnmt');
  this._http.post(this.url+'api/tournament/newtnmt', championship).subscribe(data => {
  console.log(Object);
  });
}

/**
 * Get all the championships of the data base
 * @returns
 */
getChampionships(): Observable<any>{
  return this._http.get(this.url + 'api/tournament');
}

}
