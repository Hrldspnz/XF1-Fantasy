import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RacesService} from 'src/app/services/races.service';

interface Datos {
  value: string;
  viewValue: string;
}

/**
 * 
 */
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
    this.getChampions();
  }
  /**
   * @author: Fatima Leiva
   * Gets all existing champions from the API
   */
  public getChampions() {
    this._racesService.getChampions().subscribe(
      result => {
        var counter=0;
        
        while(result[counter]!= undefined){
          var champion={value:result[counter].iD_tournament, viewValue:result[counter].tName}
          this.champions.push(champion)
          counter++;
        }
      },
      error=> {
        alert("Error al cargar los campeonatos")
      }
    )
  }

  public SaveRace() {
    console.log("Save Values");
    console.log(this.formRaces.value);
    if (this.dateValidation()) {
      var newRace:Object= {
        iD_Race: this.generateId(),
        race_name: this.formRaces.value.name,
        race_track: this.formRaces.value.track,
        country: this.formRaces.value.country,
        date_begin: this.formRaces.value.startDate,
        hour_begin: this.formRaces.value.startTime,
        date_end: this.formRaces.value.endDate,
        hour_end: this.formRaces.value.endTime,
        race_state: 'Pendiente',
        tournament_id: this.formRaces.value.champion
      }
      //this._racesService.createRace(newRace);
    }
    if(this.racesDates()) {

    }

  }
  /**
   * Do a validation if the day selected by the user is in the past or no
   * @returns true if the date is not in the past, false if it does
   */
  public dateValidation(): boolean {
    var isValid:boolean;
    var today = new Date();
    var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();

    if (this.formRaces.value.startDate < date) {
      alert("No se pueden crear carreras en el pasado \nVuelva a ingresar la fecha")
      console.log("Selected date is in the past");
      isValid=false;
    } else {
      console.log("Selected date is NOT in the past");
      isValid=true;
    }
    return isValid
  }
  public racesDates(): boolean{
    this._racesService.getRaces().subscribe(
      result=> {
        let counter=0;
        var today = new Date();
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
        while(result[counter]!=undefined){
          console.log(result[counter].date_begin)
          console.log(result[counter].date_end)
          
          let raceDate=this.DateSplit(result[counter].date_begin);

          //-------------------------------------------------------------
          console.log(date)
          console.log(raceDate)
          if (raceDate < date) {
            console.log("Selected date is after another race");
          } else {
            console.log("Selected date is before another race");
            alert("Esta se necesita si")
          }
          counter++; 
        }
      },
      error=>{

      }
    )
    return true
  }

  public DateSplit(word:string):string{
    let dateSplit= word.split(" ");
    let firstPosSplit= dateSplit[0];
    let separation=firstPosSplit.split("/");
    let day= separation[1]
    let month= separation[0]
    let year= separation[2]
    let newWord= year+'-0'+month+'-'+day;
    return newWord
  }

  /**
   * Generates an id of six characters
   * @returns the generated id
   */
  public generateId(){
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
