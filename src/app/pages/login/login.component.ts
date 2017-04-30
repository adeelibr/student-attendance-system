import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:  FormGroup;
  success: boolean = false;
  error:   boolean = false;
  data:    any;


  constructor (private _router: Router, private _authService: AuthService) {
    this.myForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  ngOnInit () {
  }

  onSubmit () {
    let formBody = {
      username: this.myForm.value.username,
      password: this.myForm.value.password
    };

    // console.log('Form Is being submitted', formBody);

    let result = this._authService.authAdmin(formBody);
    result.subscribe(
      (data) => {
        this.success = true;
        this.data    = data;
        localStorage.setItem('token', data.token);
        this._router.navigate(['dashboard']);
      },
      (error) => {
        if (error.status === 400) {
          let body = JSON.parse(error._body);
          this.error = body.message;
          this.success = false;
        }
      }
    );
  }

}
