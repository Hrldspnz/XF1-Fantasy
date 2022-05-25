import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public url: string;

  constructor( public _http: HttpClient ) {

    this.url = "https://apixfia.azurewebsites.net/"
  }

  getDrivers(): Observable<any> {
    return this._http.get(this.url + 'api/team/drivers');
  }

  getCars(): Observable<any> {
    return this._http.get(this.url + 'api/team/cars');
  }

}
