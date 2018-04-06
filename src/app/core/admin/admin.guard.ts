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

  test  = 3;

  isAuthenticated(): boolean {
    if (localStorage.getItem('admin_data')) {
      return true;
    } else {
      return false;
    }
  }

  canActivate(): Observable<boolean> {
    // Check if the user is logged in
    return this.afAuth.authState.map(auth => {
      // Check for auth

      if (this.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/admin/login']);
        return false;
      }

    });
  }



}
