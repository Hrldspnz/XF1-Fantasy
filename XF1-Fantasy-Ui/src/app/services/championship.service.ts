import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  public url: string;

  constructor(
    public _http: HttpClient
  ) {
      this.url =  "https://nutritecapi.azurewebsites.net/";
    }
}
