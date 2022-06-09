import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicLeagueService {

  url:string;

  constructor(
    public _http: HttpClient 
  ) { 
    this.url = "https://apixfia.azurewebsites.net/"
  }

  getParticipants():Observable<any>{
    return this._http.get(this.url+'api/league/publiclparticipants')
  }

}
