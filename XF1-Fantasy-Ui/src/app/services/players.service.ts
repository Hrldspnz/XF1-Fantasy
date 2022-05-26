import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public url: string;

  constructor( public _http: HttpClient ) {
    this.url = "https://apixfia.azurewebsites.net/"
  }


  addNewUser(dataUser: Object): Observable<any>{
    return this._http.post(this.url+'api/player/createAcc', dataUser);
  }

  activeUserAcc(dataUser: Object): Observable<any>{
    return this._http.put(this.url+'api/player/userstate', dataUser);
  }

}
