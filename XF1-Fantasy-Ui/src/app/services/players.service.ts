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

  /**
   * Realiza el post para agregar un nuevo usuario
   * @param dataUser Objeto con los datos
   * @returns Objeto con el request
   */
  addNewUser(dataUser: Object): Observable<any>{
    return this._http.post(this.url+'api/player/createAcc', dataUser);
  }

  /**
   * Put para cambiar el estado del jugador a activo
   * @param dataUser Objeto con los datos
   * @returns Objeto con el request
   */
  activeUserAcc(dataUser: Object): Observable<any>{
    return this._http.put(this.url+'api/player/userstate', dataUser);
  }

}
