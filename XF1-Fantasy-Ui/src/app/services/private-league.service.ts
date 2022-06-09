import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateLeagueService {
  url:string;
  constructor(
    public _http: HttpClient 
  ) { 
    this.url = "https://apixfia.azurewebsites.net/"
  }

  isInLeague(userEmail:string):Observable<any>{
    return this._http.get(this.url+'api/league/isinprivateleague/'+userEmail)
  }

  getLeaguesOfUser(userEmail:string):Observable<any> {
    return this._http.get(this.url+'api/league/privatelparticipants/'+userEmail)
  }

  getUserLeagueInfo(userEmail:string):Observable<any>{
    return this._http.get(this.url+'api/league/userprivlinfo/'+userEmail)
  }
}
