import { Component, OnInit } from '@angular/core';
import { RacesService } from 'src/app/services/races.service';


interface Positions {
  nameUser: string;
  country: string;
  score:number;
  pos:string;
  email:string;
}

@Component({
  selector: 'app-upload-race-results',
  templateUrl: './upload-race-results.component.html',
  styleUrls: ['./upload-race-results.component.css']
})
export class UploadRaceResultsComponent implements OnInit {

  // Atributes
  displayedColumns = ['pos','nameUser','nameTeam', 'country', 'score','select'];
  data: Positions[] = [{
  nameUser: 'Hola',
  country: 'Alajuela',
  score:12,
  pos:'1',
  email:'jasas'
},
{
  nameUser: 'jesus',
  country: 'nicaragua',
  score:10,
  pos:'2',
  email:'jasrses'
}];

  constructor(private _racesService: RacesService) { }

  ngOnInit(): void {
  }

  uploadRaces(){
    this._racesService.getRaces().subscribe(
      result=>{

      }
    )
  }

}
