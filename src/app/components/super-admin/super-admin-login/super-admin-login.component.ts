import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {SuperAdminLogin} from '../../../models/super-admin-login';
import {LoginService} from '../../../services/super-admin/login.service';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css']
})
export class SuperAdminLoginComponent implements OnInit {

  login_data: SuperAdminLogin = {
    email: '',
    password: ''
  }
  login_error = 0;
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};


  constructor(public loginService: LoginService, public router: Router) {}

  ngOnInit() {
    this.loginService.logoutWithEmail();
  }

  onSubmit({value, valid}: {value: SuperAdminLogin , valid: boolean}) {
    this.loginService.loginWithEmail(value.email, value.password)
      .then(() => this.router.navigate(['/super-admin'])
      )
      .catch(_error => {
        this.error = _error;
      });
  }

}
