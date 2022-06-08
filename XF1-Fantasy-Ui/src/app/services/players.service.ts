import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  email:string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public url: string;
  public user: User={
    email: '',
    password:''
  };
  public infoUser:any;

  /**
   * Constructor of the class
   * @param _http Http Client instance
   */
  constructor( public _http: HttpClient ) {
    this.url = "https://apixfia.azurewebsites.net/"
  }

  /**
   * Add a new user into the data base
   * @param dataUser Data of the new user
   * @returns Observable with the result of the request
   */
  addNewUser(dataUser: Object): Observable<any>{
    return this._http.post(this.url+'api/player/createAcc', dataUser);
  }

  /**
   * Gets the user from the data base
   * @param userEmail Emain of the user
   * @returns Data of the user
   */
  getUser(userEmail:string): Observable<any>{
    this.infoUser = this._http.get(this.url+'api/player/pass/'+ userEmail);
    return this.infoUser;
  }

  /**
   * Get the user password from the data base
   * @param userEmail Email of the user
   * @returns Password
   */
  getUserPassword(userEmail:string): Observable<any>{
    return this._http.get(this.url+'api/player/pass/'+ userEmail);
  }

  /**
   * Set the info of the user
   * @param email
   * @param password
   */
  setCurrentlyUser(email:string, password:string){
    this.user.email = email;
    this.user.password = password;
  }

  /**
   * Put para cambiar el estado del jugador a activo
   * @param dataUser Objeto con los datos
   * @returns Objeto con el request
   */
  activeUserAcc(dataUser: Object): Observable<any>{
    return this._http.put(this.url+'api/player/userstate', dataUser);
  }


  /**
  * Add a new private league into the data base
  * @param dataLeague Data of the new league
  * @returns Observable with the result of the request
  */
   addNewLeague(dataLeague: Object): Observable<any>{
    return this._http.post(this.url+'api/league/newprivateleague', dataLeague);
  }

  /**
  * Add a user into a private league
  * @param dataLeague Data of the user and the league
  * @returns Observable with the result of the request
  */
   joinLeague(dataLeague: Object): Observable<any>{
    return this._http.post(this.url+'api/league/insertinprivleague', dataLeague);
  }

}
