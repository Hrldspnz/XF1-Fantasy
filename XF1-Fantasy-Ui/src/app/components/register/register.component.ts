import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', price: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', price: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', price: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', price: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron',price: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', price: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', price: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', price: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', price: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', price: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
   }

  ngOnInit(): void {

  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

      /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }



  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


}
