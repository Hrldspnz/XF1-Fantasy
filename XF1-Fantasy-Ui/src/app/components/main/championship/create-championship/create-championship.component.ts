import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-championship',
  templateUrl: './create-championship.component.html',
  styleUrls: ['./create-championship.component.css']
})
export class CreateChampionshipComponent implements OnInit {

  formChampionship: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

}
