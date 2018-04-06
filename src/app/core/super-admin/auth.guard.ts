import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../services/super-admin/auth.service';
import {AdminService} from '../../services/admin/admin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  admins: any;

  constructor(private adminService: AdminService, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.adminService.getAdmins().subscribe(
      admin => {
        this.admins = admin;
      });
    // if (!this.authService.isAuthenticated){
    //   this.authService.showLogin(state.url);
    //   return false;
    // }
    return true;
  }
}
