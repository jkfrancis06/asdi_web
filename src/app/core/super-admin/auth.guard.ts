import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../services/super-admin/auth.service';
import {AdminService} from '../../services/admin/admin.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  admins: any;

  constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.afAuth.authState.map(auth => {
        // Check for auth
        if (!auth) {
          // Redirect to login
          this.router.navigate(['/super-admin/login']);
          return false;
        } else {
          return true;
        }
      });
    }
}

