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
    {value: 'Costa Rica', viewValue: 'Costa Rica'},
    {value: 'Panama', viewValue: 'Panama'},
    {value: 'Colombia', viewValue: 'Colombia'},
    {value: 'Nicaragua', viewValue: 'Nicaragua'},
    {value: 'Peru', viewValue: 'Peru'},
    {value: 'Chile', viewValue: 'Chile'},
    {value: 'Estados Unidos', viewValue: 'Estados Unidos'},
    {value: 'Argentina', viewValue: 'Argentina'},
    {value: 'Guatemala', viewValue: 'Guatemala'},
  ];

  champions: Datos[] = [];
  /**
   * It's the constructor of the class
   * @param fb is a builder for a user form
   * @param _racesService is the service to connnect to the api
   */
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
      thiscountry: ['', Validators.required],
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
  /**
   * Saves the race created by the user
   */
  public SaveRace() {
    console.log("Save Values");
    console.log(this.formRaces.value);
    if (this.dateValidation()) {
      if(this.racesDates()) {
        var newRace:Object= {
          iD_Race: this.generateId(),
          race_name: this.formRaces.value.name,
          race_track: this.formRaces.value.track,
          country: this.formRaces.value.thiscountry,
          date_begin: this.formRaces.value.startDate,
          hour_begin: this.formRaces.value.startTime,
          date_end: this.formRaces.value.endDate,
          hour_end: this.formRaces.value.endTime,
          race_state: 'Pendiente',
          tournament_id: this.formRaces.value.champion
        }
        this._racesService.createRace(newRace);
      }
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
      isValid=false;
    } else {
      isValid=true;
    }
    return isValid
  }

  /**
   * Does a validation of the date
   * @returns true if the validation is correct
   */
  public racesDates(): boolean{
    var flag:boolean=true;
    this._racesService.getRaces().subscribe(
      result=> {
        let counter=0;
        var dateBegin = this.formRaces.value.startDate;
        var dateEnd = this.formRaces.value.endDate;
        flag=true;
        
        while(result[counter]!=undefined){
          
          let raceDateBegin=this.DateSplit(result[counter].date_begin);
          let raceDateEnd=this.DateSplit(result[counter].date_end);

          //-------------------------------------------------------------
          if ((dateBegin>raceDateEnd&& dateEnd>raceDateEnd) ||
           (dateBegin<raceDateBegin&& dateEnd<raceDateBegin)) {
            flag=true;
            console.log("se hace true si señor")
            
          } else {
            alert("Ya existe una carrera en esta fecha\nSeleccione otra fecha")
            flag=false;
            break
            
          }
          counter++; 
        }
      },
      error=>{
        console.log("There's an error getting dates of races")
      }
      
    )
    return flag
  }
  /**
   * Does a validation for the text
   * @returns a flag with the result of validation
   */
  textValidation(): boolean{
    let valiFlag = false;
    const lengthName = this.formRaces.value.name.length;
    const lengthRule = this.formRaces.value.track.length;
    if (lengthName > 4 && lengthName < 30 && lengthRule < 30 &&lengthRule > 4){

      valiFlag = true;
    }else{
      alert("El nombre o las reglas no cumplen con la cantidad de caracteres requeridos")
      valiFlag = false;
    }
    return valiFlag;
   }
  /**
   * Makes a split 
   * @param word 
   * @returns 
   */
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
