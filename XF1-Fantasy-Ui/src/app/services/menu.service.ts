import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /**
   * Constructor of the class
   * @param _http Http Client instance
   */
  constructor(private http: HttpClient) { }

  /**
  * Get the data for the menu of admins from the assets folder
  * @returns JSON with the menu
  */
  getMenu(): Observable<Menu[]>{
    return  this.http.get<Menu[]>("./assets/data/menu.json")
  }

  /**
  * Get the data for the menu of admins from the assets folder
  * @returns JSON with the menu
  */
  getMenu2(): Observable<Menu[]>{
    return  this.http.get<Menu[]>("./assets/data/menu2.json")
  }
}
