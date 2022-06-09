import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.css']
})
export class AddLeagueComponent implements OnInit {

  menu: Menu[] = [];
  formJoinLeague: FormGroup;

  /**
   * Constructor of the class
   * @param fb
   * @param _menuService
   * @param _playerService
   * @param router
   */
  constructor(private fb: FormBuilder, private _menuService: MenuService,
              private _playerService: PlayersService,
              private router: Router) {

    this.formJoinLeague = this.fb.group ({
      code: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.loadMenu();
  }


  /**
   * Loads the navbar menu from Menu Service
   */
  loadMenu (){
    this._menuService.getMenu2().subscribe(data => {
      console.log(data);
      this.menu = data;
      }
    )
  }

  /**
   * Joins into a League with a code
   */
  JoinLeague(){
    const leaguePrivate : Object =
    {
      idLeague: this.formJoinLeague.value.code,
      email: this._playerService.user.email,
    }
    console.log(leaguePrivate)
    this._playerService.joinLeague(leaguePrivate).subscribe(
      data => {
        console.log(data);
      });
    this.router.navigate(['user/private-leagues']);
  }

}
