import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChampionshipService } from 'src/app/services/championship.service';

@Component({
  selector: 'app-create-championship',
  templateUrl: './create-championship.component.html',
  styleUrls: ['./create-championship.component.css']
})
export class CreateChampionshipComponent implements OnInit {

  formChampionship: FormGroup;
  listIDs: string[] = [];
  listStartDates: string[] = [];

  constructor(private fb: FormBuilder,
              private _championshipService: ChampionshipService) {
    this.formChampionship = this.fb.group ({
      name: ['', Validators.required],
      rules: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.getIDs();

  }

  getIDs(){
    console.log("deaaaay")
   this._championshipService.getChampionships().subscribe(
     result => {
       result;
       var i = 0;
       while(result[i] != undefined){
         this.listIDs.push(result[i].iD_tournament);
         this.listStartDates.push(result[i].date_begin);
         i++;
       }
       console.log(this.listStartDates)
     },
     error => {
       console.log("Error al cargar la lista de Empleados")
     });
  }

  generateID() {
    let result = '';
    let resultAux = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        resultAux += characters.charAt(Math.floor(Math.random() * charactersLength));
        for ( let i = 0; i < this.listIDs.length; i++){
          if (this.listIDs[i] != resultAux){
            result = resultAux;
          }else{
            resultAux = '';
          }
        }
    }
    return result;
  }

   textValidation(): boolean{
    let valiFlag = false;
    const lengthName = this.formChampionship.value.name.length;
    const lengthRule = this.formChampionship.value.rules.length;
    if (lengthName > 4 && lengthName < 30 && lengthRule < 1000){

      valiFlag = true;
    }else{
      alert("El nombre o las reglas no cumplen con la cantidad de caracteres requeridos")
      valiFlag = false;
    }
    return valiFlag;
   }

  dateValidation(): boolean {
    var isValid:boolean;
    var today = new Date();
    var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
    if (this.formChampionship.value.startDate < date) {
      alert("No se pueden crear campeonatos en el pasado \nVuelva a ingresar la fecha")
      isValid=false;
    } else {
      isValid=true;
    }
    return isValid
  }

  addChampionship(){
    let nameValid = this.textValidation();
    let dateValid = this.dateValidation();
    if (nameValid == true && dateValid == true){
      const newChampionship: Object =
      {
        iD_tournament: this.generateID(),
        tName: this.formChampionship.value.name,
        date_begin: this.formChampionship.value.startDate,
        hour_begin: this.formChampionship.value.startTime,
        date_end: this.formChampionship.value.endDate,
        hour_end: this.formChampionship.value.endTime,
        rules_desc: this.formChampionship.value.rules,
        budget: Number(this.formChampionship.value.budget)
      }
      console.log(newChampionship)
      this._championshipService.addChampionship(newChampionship)
    } else {
      console.log("no se puede crear el campeonmato")
    }
  }


}
