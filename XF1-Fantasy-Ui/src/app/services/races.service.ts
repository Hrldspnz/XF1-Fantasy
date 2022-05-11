import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  public url: string;

  constructor(
    public _http: HttpClient
  ) {
      this.url =  "https://apixfia.azurewebsites.net/";
    }

  public getChampions(): Observable<any>{
    return this._http.get(this.url + 'api/tournament');
  }

  public createRace(raceData:Object) {
    console.log(this.url+'api/race/newrace');
      this._http.post(this.url+'api/race/newrace', raceData).subscribe(data => {
      console.log(data);
    });
  }
}
