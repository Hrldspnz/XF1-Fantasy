import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampionshipComponent } from 'src/app/components/main/championship/championship.component';
import { ChampionshipService } from 'src/app/services/championship.service';
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
  driverCreated=false;

  //Indicators for budget
  budget = 100;
  spentBudget = 0;
  remainingBudget = 100;
  loading = false;
  emailUser: string | null;
  formTeam1: FormGroup;

  /**
   * Constructor de la clase
   * @param fb
   * @param _teamsService
   * @param router
   * @param aRoute
   */
  constructor(private fb: FormBuilder,
              private _teamsService: TeamsService,
              private _champService: ChampionshipService,
              private router: Router,
              private aRoute: ActivatedRoute) {
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
      });
    this.emailUser = this.aRoute.snapshot.paramMap.get("email_user");

  }

  ngOnInit(): void {
    this.loadCars()
    this.loadDrivers()
    this.loadCurrentlyBudget()

  }

  /**
   * Get all the drivers from data base
   */
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

  /**
   * Get all the cars from data base
   */
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

  /**
   *
   */
  loadCurrentlyBudget(){
    this._champService.getCurrentlyBudget().subscribe(
      result => {
        this.budget = result.value;
        this.remainingBudget = result.value;
      }
    )
  }

  /**
   * Creates the object with a new team and calls the service
   */
  createTeam(){
    console.log(this.remainingBudget)
    if ( this.remainingBudget < 0){
      alert("Se ha excedido el presupuesto disponible para crear el Equipo")
    } else {
      alert("Se han guardado los datos correctamente")
      this.driverCreated=true;
      const team: Object =
      {
        nameTeam: this.formTeam1.value.teamName,
        email: this.emailUser,
        budget: this.spentBudget,
        nameDriver1: this.formTeam1.value.driver1,
        nameDriver2: this.formTeam1.value.driver2,
        nameDriver3: this.formTeam1.value.driver3,
        nameDriver4: this.formTeam1.value.driver4,
        nameDriver5: this.formTeam1.value.driver5,
        car: this.formTeam1.value.constructor
      }
      console.log(team)
      this._teamsService.addNewTeam(team).subscribe(data => {
        data;
      }, error => {
        alert("Error al crear Cuenta de Usuario, revise dirección de Correo Electrónico ingresada")
      }
      );
      this.fakeLoadingUser();
    }
  }


    /**
   * Simulates a loading for 1.5 seconds
   */
     fakeLoadingUser(){
      this.loading = true;
      setTimeout (() => {
        this.router.navigate(['/register/create-team/' + this.emailUser])
      }, 1500)
    }

  /**
   *
   * @param name
   * @param action
   */
  changeStateDriver(name: string, action: string) {
    let i = 0;
    while( i < this.listDrivers.length){
      if (this.listDrivers[i].name == name){
        if (action == 'delete'){
          this.listDrivers[i].state = "notChoosed"
          this.driverCreated=false;
        } else {
          this.listDrivers[i].state = "choosed"
          this.driverCreated=true;
        }
      break;
      }
      i++
    }
  }

  /**
   * Updates the fields of the drivers form
   */
  updateForm(){
    this.formTeam1.patchValue({driver1: this.listDriverSelection[0],
                               driver2: this.listDriverSelection[1],
                               driver3: this.listDriverSelection[2],
                               driver4: this.listDriverSelection[3],
                               driver5: this.listDriverSelection[4]})
  }

  /**
   *
   * @param name
   * @param price
   */
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

  /**
   *
   * @param name
   * @param price
   */
  deleteDriver(name: string, price: string){
    let i = 0;
    while ( i < this.listDriverSelection.length){
      if ( this.listDriverSelection[i] == name){
        this.listDriverSelection[i] = '';
        this.updateForm();
        this.changeStateDriver(name, 'delete');
        this.updateBudget(price, 'delete');
        this.counterDrivers -= 1;
        break
      }
      i++;
    }
  }

  /**
   *
   * @param name
   * @param action
   */
  changeStateConstructor(name: string, action: string){
    let i = 0;
    while( i < this.listCars.length){
      if (this.listCars[i].name == name){
        if (action == 'delete'){
          this.listCars[i].state = "notChoosed"
          this.driverCreated=false
        } if ( action == 'add') {
          this.listCars[i].state = "choosed"
          this.driverCreated=true
        }
      break;
      }
      i++
    }
  }

  /**
   *
   * @param name
   * @param price
   * @param action
   */
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

  /**
   *
   * @param price
   * @param action
   */
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

  /**
   *
   * @param index
   */
  setStep(index: number) {
    this.stepTeam = index;
  }


  /**
   *
   */
  nextStep() {
    this.stepTeam++;
  }

  /**
   *
   */
  prevStep() {
    this.stepTeam--;
  }

}

