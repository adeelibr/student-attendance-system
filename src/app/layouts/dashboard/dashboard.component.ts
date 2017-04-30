import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { 
    // if token does not exists redirect user to login page
    if (!localStorage.getItem('token')) {
      this._router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

}
