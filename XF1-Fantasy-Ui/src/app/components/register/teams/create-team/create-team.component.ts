import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  listDrivers: any[] = [];
  listCars: any[] = [];

  displayedColumnsDrivers: string[] = ['name', 'price', 'actions'];
  displayedColumnsConstructors: string[] = ['name', 'price', 'actions'];

  dataSourceDrivers!: MatTableDataSource<any>;
  dataSourceConstructors!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginatorDrivers!: MatPaginator;

  stepTeam = 0;

  //Indicators for team selection
  counterDrivers = 0;
  flagConstructor = false;
  listDriverSelection: string[] = ['', '', '', '', ''];

  //Indicators for budget
  budget = 100;
  spentBudget = 0;
  remainingBudget = 100;

  formTeam1: FormGroup;

  constructor(private fb: FormBuilder,
              private _teamsService: TeamsService) {
    this.formTeam1 = this.fb.group ({
      teamName: ['', Validators.required],
      driver1: ['', Validators.required],
      driver2: ['', Validators.required],
      driver3: ['', Validators.required],
      driver4: ['', Validators.required],
      driver5: ['', Validators.required],
      constructor: ['', Validators.required],
      spentBudget: ['', Validators.required],
      remainingBudget: ['', Validators.required]
      })

  }

  ngOnInit(): void {
    this.loadCars()
    this.loadDrivers()

  }


  loadDrivers(){
    this._teamsService.getDrivers().subscribe(
      result => {
        result;
        var i = 0;
        while(result[i] != undefined){
          this.listDrivers.push({name:result[i].nameDriver,
                                  price:result[i].price, state:"notChoosed"});
          i++;
          this.dataSourceDrivers = new MatTableDataSource(this.listDrivers);
          this.dataSourceDrivers.paginator = this.paginatorDrivers;
        }
      },
      error => {
        alert("Error al cargar la lista de Pliotos")
      });
  }

  loadCars(){
    this._teamsService.getCars().subscribe(
      result => {
        result;
        var i = 0;
        while(result[i] != undefined){
          this.listCars.push({name:result[i].nameCar,
                                  price:result[i].price, state:"notChoosed"});
          i++;
          this.dataSourceConstructors = new MatTableDataSource(this.listCars);
        }
      },
      error => {
        alert("Error al cargar la lista de Pliotos")
      });
  }

  createTeam(){
    if ( this.remainingBudget < 0){
      alert("Se ha excedido el presupuesto disponible para crear el Equipo")
    } else {
      alert("Equipo creado con Exito")
    }
  }

  changeStateDriver(name: string, action: string) {
    let i = 0;
    while( i < this.listDrivers.length){
      if (this.listDrivers[i].name == name){
        if (action == 'delete'){
          this.listDrivers[i].state = "notChoosed"
        } else {
          this.listDrivers[i].state = "choosed"
        }
      break;
      }
      i++
    }
  }

  updateForm(){
    this.formTeam1.patchValue({driver1: this.listDriverSelection[0],
                               driver2: this.listDriverSelection[1],
                               driver3: this.listDriverSelection[2],
                               driver4: this.listDriverSelection[3],
                               driver5: this.listDriverSelection[4]})
  }

  addDriver(name: string, price: string){
    let i = 0;
    while ( i < this.listDriverSelection.length){
      if ( this.counterDrivers != 5){
        if ( this.listDriverSelection[i] == ''){
          this.listDriverSelection[i] = name;
          this.updateForm();
          this.changeStateDriver(name, 'add');
          this.updateBudget(price, 'add');
          this.counterDrivers += 1;
          console.log(this.counterDrivers)
          break
        }
      }
      else{
        alert ("No se pueden seleccionar más de 5 pilotos")
        break
      }
      i++;
    }
  }

  deleteDriver(name: string, price: string){
    let i = 0;
    while ( i < this.listDriverSelection.length){
      if ( this.listDriverSelection[i] == name){
        this.listDriverSelection[i] = '';
        this.updateForm();
        this.changeStateDriver(name, 'delete');
        this.updateBudget(price, 'delete');
        this.counterDrivers -= 1;
        console.log(this.counterDrivers)
        break
      }
      i++;
    }
  }

  changeStateConstructor(name: string, action: string){
    let i = 0;
    while( i < this.listCars.length){
      if (this.listCars[i].name == name){
        if (action == 'delete'){
          this.listCars[i].state = "notChoosed"
        } if ( action == 'add') {
          this.listCars[i].state = "choosed"
        }
      break;
      }
      i++
    }
  }

  addDeleteConstructor(name: string, price: string, action: string){
    if ( action == 'add'){
      if ( this.flagConstructor == false){
        this.formTeam1.patchValue({constructor: name});
        this.changeStateConstructor(name, action);
        this.updateBudget(price, action)
        this.flagConstructor = true;
      } else {
        alert("Solo puede seleccionar un Constructor")
      }
    }if ( action == 'delete') {
      this.formTeam1.patchValue({constructor: ""});
      this.changeStateConstructor(name, action);
      this.updateBudget(price, action);
      this.flagConstructor = false;
    }
  }

  updateBudget(price: string, action: string){
    let value = Number(price);
    if ( action == "delete") {
      this.spentBudget -= value;
      this.remainingBudget += value;
      this.formTeam1.patchValue({remainingBudget: this.remainingBudget,
                                 spentBudget: this.spentBudget})
    }if ( action == "add") {
      this.spentBudget += value;
      this.remainingBudget -= value;
      this.formTeam1.patchValue({remainingBudget: this.remainingBudget,
                                 spentBudget: this.spentBudget})
    }
  }

  setStep(index: number) {
    this.stepTeam = index;
  }

  nextStep() {
    this.stepTeam++;
  }

  prevStep() {
    this.stepTeam--;
  }

}

