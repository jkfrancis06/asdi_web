import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

import {Router} from '@angular/router';

import {AdminService} from '../../services/admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router,  public afAuth: AngularFireAuth) {
  }

  val: boolean ;

  isAuthenticated() {
    if (localStorage.getItem('admin_data')) {
      this.adminService.loadLocalAdmin(localStorage.getItem('admin_data')).subscribe(
        admin => {
          if (admin) {
            console.log(true)
            this.val = true;
          } else {
            console.log(false)
            this.val = false;
          }
        });
    } else {
      console.log(false)
      this.val = false;
    }
  }

  canActivate() {
    // Check if the user is logged in
    return this.adminService.loadLocalAdmin(localStorage.getItem('admin_data')).map(
      admin => {
        if (admin) {
          return true;
        } else {
          this.router.navigate(['/admin/login']);
          return false;
        }
      });
  }



}
