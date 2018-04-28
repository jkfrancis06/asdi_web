import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ManagerLogin} from '../../../models/manager.login';
import {ManagerService} from '../../../services/admin/manager.service';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent implements OnInit {

  login_data: ManagerLogin = {
    username: '',
    password: ''
  }
  activated = 0;
  login_error = 0;
  manager: any;

  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: ManagerLogin , valid: boolean}) {
    this.managerService.loadLoginData(value.username).subscribe(
      manager => {
        this.manager = manager;
        if (this.manager.length !== 0) {
          console.log(this.manager);
          const bdd_manager = this.manager[0];
          if (value.password !== bdd_manager.password) {
            this.login_error = 1;
          } else {
            this.login_error = 0;
            if (bdd_manager.enabled === true) {
              this.activated = 0;
              localStorage.setItem('manager_data', bdd_manager.key);
              this.router.navigate(['/manager']);
            } else {
              this.activated = 1;
            }
          }
        } else {
          this.login_error = 1;
        }
      });
  }

}
