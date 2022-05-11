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
      this.url =  "https://apixfia.azurewebsites.net/";
    }

addChampionship(championship: Object){
  console.log(this.url+'api/tournament/newtnmt');
  this._http.post(this.url+'api/tournament/newtnmt', championship).subscribe(data => {
  console.log(Object);
  });
}

getChampionships(): Observable<any>{
  return this._http.get(this.url + 'api/tournament');
}

}
