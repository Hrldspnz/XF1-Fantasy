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
    this.generateID();
  }

  generateID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   }



  addChampionship(){
    if (this.formChampionship.invalid){
      return;
    }
    const newChampionship: Object =
    {
      iD_tournament: this.generateID(),
      tName: this.formChampionship.value.name,
      date_begin: this.formChampionship.value.startDate,
      hour_begin: this.formChampionship.value.startTime,
      date_end: this.formChampionship.value.endDate,
      hour_end: this.formChampionship.value.endTime,
      rules_desc: this.formChampionship.value.rules,
      budget: this.formChampionship.value.budget
    }
    console.log(newChampionship)
    this._championshipService.addChampionship(newChampionship)
  }
}
