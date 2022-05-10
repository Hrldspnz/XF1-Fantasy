import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Pais {
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

  paises: Pais[] = [
    {value: 'Costa Rica-0', viewValue: 'Costa Rica'},
    {value: 'Panama-1', viewValue: 'Panama'},
    {value: 'Colombia-2', viewValue: 'Colombia'},
  ];

  constructor(private fb: FormBuilder) {
    this.formRaces = this.fb.group ({
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
  }

}
