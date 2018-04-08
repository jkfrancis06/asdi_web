import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {AdminLogin} from '../../../models/admin.login';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_data: AdminLogin = {
    username: '',
    password: ''
  }
  login_error = 0;
  admin: any;

  constructor(public adminService: AdminService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: AdminLogin , valid: boolean}) {
    this.adminService.loadLoginData(value.username).subscribe(
      admin => {
        this.admin = admin;
        console.log(admin)
        if (admin.length !== 0) {
          const bdd_admin = this.admin[0];
          if (value.password !== bdd_admin.password) {
            this.login_error = 1;
          } else {
            this.login_error = 0;
            localStorage.setItem('admin_data', bdd_admin.key);
            this.router.navigate(['/admin']);
          }
        } else {
          this.login_error = 1;
        }
      });
  }

}
