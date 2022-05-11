import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RacesService} from 'src/app/services/races.service';

interface Datos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-race',
  templateUrl: './create-race.component.html',
  styleUrls: ['./create-race.component.css']
})
export class CreateRaceComponent implements OnInit {

  formRaces: FormGroup;

  countries: Datos[] = [
    {value: 'Costa Rica-0', viewValue: 'Costa Rica'},
    {value: 'Panama-1', viewValue: 'Panama'},
    {value: 'Colombia-2', viewValue: 'Colombia'},
  ];

  champions: Datos[] = [];

  constructor(
    private fb: FormBuilder,
    private _racesService: RacesService
    ) {
    this.formRaces = this.fb.group ({
      name: ['', Validators.required],
      track: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      country: ['', Validators.required],
      champion: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.getChampions()
  }

  public getChampions() {
    this._racesService.getChampions().subscribe(
      result => {
        var counter=0;
        
        while(result[counter]!= undefined){
          var champion={value:result[counter].iD_tournament, viewValue:result[counter].tName}
          console.log(result[counter].tName);
          this.champions.push(champion)
          console.log(champion);
          counter++;
        }
      }
    )
  }

  public SaveRace() {
    console.log("Save Values");
    console.log(this.formRaces.value);
  }

}
